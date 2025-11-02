# Server/ml_engine/tasks.py
import cv2
import os
import json  # <-- 1. Import JSON
from django.conf import settings
from .apps import MlEngineConfig

# Your engagement rules
ENGAGED_CLASSES = [
    'hand-raising', 'raise_head', 'reading', 'upright', 'writing'
]
DISENGAGED_CLASSES = [
    'Using_phone', 'bend', 'bow_head', 'sleep', 'turn_head'
]

def process_video_task():
    """
    Processes the demo video and creates TWO files:
    1. final_demo.mp4 (annotated video)
    2. demo_data.json (metrics for each frame)
    """
    
    # 1. Get the pre-loaded model
    model = MlEngineConfig.model
    if model is None:
        print("Model not loaded, skipping task.")
        return

    # 2. Define File Paths
    input_video_path = os.path.join(settings.BASE_DIR, 'media', 'trial2.mp4')
    output_video_name = 'final_demo.mp4'  # Use .mp4
    output_video_path = os.path.join(settings.MEDIA_ROOT, output_video_name)
    
    # --- 3. NEW: Define JSON data path ---
    output_json_name = 'demo_data.json'
    output_json_path = os.path.join(settings.MEDIA_ROOT, output_json_name)

    # --- 4. NEW: Clean up *both* old files ---
    # This is important so the frontend knows when the *new* file is ready
    if os.path.exists(output_video_path):
        os.remove(output_video_path)
    if os.path.exists(output_json_path):
        os.remove(output_json_path)

    # 5. Open Video Reader
    cap = cv2.VideoCapture(input_video_path)
    if not cap.isOpened():
        print(f"Error: Could not open video file: {input_video_path}")
        return

    # 6. Set up Video Writer
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS) # Get FPS as float
    
    # Use the 'avc1' (H.264) codec, which is best for web browsers
    fourcc = cv2.VideoWriter_fourcc(*'avc1') 
    out = cv2.VideoWriter(output_video_path, fourcc, fps, (frame_width, frame_height))
    
    if not out.isOpened():
        print(f"Error: Could not create output video file: {output_video_path}")
        cap.release()
        return

    print("--- Background task started: Processing video and metrics... ---")
    
    # --- 7. NEW: List to store all metrics ---
    all_metrics_data = []

    # 8. Loop and Process Frames
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            break  # End of video
        
        # Get the current timestamp (in seconds)
        current_time_sec = cap.get(cv2.CAP_PROP_POS_MSEC) / 1000.0

        results = model.track(frame, persist=True, verbose=False)
        
        # Your engagement logic
        engaged_student_ids = set()
        disengaged_student_ids = set()
        all_detected_activities = set() # To store all unique behaviors
        
        if results[0].boxes.id is not None:
            for box in results[0].boxes:
                class_id = int(box.cls[0])
                class_name = model.names[class_id]
                student_id = int(box.id[0]) # Get the unique tracking ID
                
                all_detected_activities.add(class_name) # Add the behavior

                if class_name in ENGAGED_CLASSES:
                    engaged_student_ids.add(student_id)
                elif class_name in DISENGAGED_CLASSES:
                    disengaged_student_ids.add(student_id)
        
        # --- 9. NEW CALCULATION: ---
        # This is the magic. We count a student as disengaged ONLY
        # if they are in the disengaged set AND NOT in the engaged set.
        # This gives priority to engagement.
        truly_disengaged_ids = disengaged_student_ids - engaged_student_ids
        
        engaged_count = len(engaged_student_ids)
        disengaged_count = len(truly_disengaged_ids)
        
        # Total students is the count of *all unique students* we saw a behavior from
        total_students = len(engaged_student_ids.union(truly_disengaged_ids))
        
        engagement_score = (engaged_count / total_students * 100) if total_students > 0 else 0
        session_score = int(engagement_score * 0.9)
        activities = list(all_detected_activities) # List of all unique behaviors seen

        # --- 9. NEW: Store metrics for this timestamp ---
        # This structure matches what your frontend expects
        frame_metrics = {
            "time": current_time_sec,
            "metrics": {
                "student_count": total_students,
                "engagement": round(engagement_score),
                "student_score": session_score,
                "activities": activities
            }
        }
        all_metrics_data.append(frame_metrics)

        # Draw boxes and score
        annotated_frame = results[0].plot(img=frame)
        score_text = f"Engagement: {engagement_score:.1f}%"
        cv2.putText(annotated_frame, score_text, (20, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 3)

        # Write the frame
        out.write(annotated_frame)

    # --- 10. NEW: Write the JSON file *after* the loop is done ---
    with open(output_json_path, 'w') as f:
        json.dump(all_metrics_data, f, indent=2)

    # 11. Release Everything
    cap.release()
    out.release()
    print(f"--- Background task finished: Video and JSON data saved. ---")
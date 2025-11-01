# ml_engine/tasks.py
import cv2
import os
from django.conf import settings
from .apps import MlEngineConfig  # Import the pre-loaded model

# Your engagement rules
ENGAGED_CLASSES = [
    'hand-raising', 'raise_head', 'reading', 'upright', 'writing'
]
DISENGAGED_CLASSES = [
    'Using_phone', 'bend', 'bow_head', 'sleep', 'turn_head'
]

def process_video_task():
    """
    This function contains your ML script logic.
    It will be run in a background thread.
    """
    
    # 1. Get the pre-loaded model
    model = MlEngineConfig.model
    if model is None:
        print("Model not loaded, skipping task.")
        return

    # 2. Define File Paths
    input_video_path = os.path.join(settings.BASE_DIR, 'media', 'trial2.mp4')
    output_video_name = 'final_demo.mp4' # Use .avi for XVID
    output_video_path = os.path.join(settings.MEDIA_ROOT, output_video_name)

    # 3. Clean up old file (if it exists)
    if os.path.exists(output_video_path):
        os.remove(output_video_path)

    # 4. Open Video Reader
    cap = cv2.VideoCapture(input_video_path)
    if not cap.isOpened():
        print(f"Error: Could not open video file: {input_video_path}")
        return

    # 5. Set up Video Writer
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    
    fourcc = cv2.VideoWriter_fourcc(*'avc1')
    out = cv2.VideoWriter(output_video_path, fourcc, fps, (frame_width, frame_height))
    
    if not out.isOpened():
        print(f"Error: Could not create output video file: {output_video_path}")
        cap.release()
        return

    print("--- Background task started: Processing video... ---")
    
    # 6. Loop and Process Frames
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            break  # End of video

        results = model(frame, verbose=False)
        
        # Your engagement logic
        engaged_count = 0
        disengaged_count = 0
        for box in results[0].boxes:
            class_id = int(box.cls[0])
            class_name = model.names[class_id]
            if class_name in ENGAGED_CLASSES:
                engaged_count += 1
            elif class_name in DISENGAGED_CLASSES:
                disengaged_count += 1
        
        total_students = engaged_count + disengaged_count
        engagement_score = (engaged_count / total_students * 100) if total_students > 0 else 0

        # Draw boxes and score
        annotated_frame = results[0].plot(img=frame)
        score_text = f"Engagement: {engagement_score:.1f}%"
        cv2.putText(annotated_frame, score_text, (20, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 3)

        # Write the frame
        out.write(annotated_frame)

    # 7. Release Everything
    cap.release()
    out.release()
    print(f"--- Background task finished: Video saved to {output_video_path} ---")
from ultralytics import YOLO
import cv2
import time

# --- 1. Define Your Engagement Rules ---
ENGAGED_CLASSES = [
    'hand-raising', 'raise_head', 'reading', 'upright', 'writing'
]
DISENGAGED_CLASSES = [
    'Using_phone', 'bend', 'bow_head', 'sleep', 'turn_head'
]

yolo_path = r'../../weights/yolov8n.pt'
# --- 2. Load Your Model ---
model = YOLO(yolo_path)  # <-- Make sure this path is correct

# --- 3. Open Your Input Video ---
video_path = r'../../media/trial2.mp4'  # <-- MAKE SURE THIS FILENAME IS 100% CORRECT
cap = cv2.VideoCapture(video_path)

# --- NEW: DEBUGGING STEP 1 ---
# Let's check if the video file opened successfully
if not cap.isOpened():
    print(f"--- ERROR ---")
    print(f"Could not open video file: {video_path}")
    print("Please check the file name and path.")
    exit()
else:
    print(f"Successfully opened video file: {video_path}")

# --- 4. Set Up the Output Video Writer ---
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
fps = int(cap.get(cv2.CAP_PROP_FPS))

# --- NEW: DEBUGGING STEP 2 ---
# Let's print the properties we are going to use
print(f"Input Video Properties: Width={frame_width}, Height={frame_height}, FPS={fps}")

# We will use the reliable 'XVID' codec and '.avi' format
fourcc = cv2.VideoWriter_fourcc(*'avc1')
output_video_path = r'../../media/final_video.mp4'  # Note the .avi extension
out = cv2.VideoWriter(output_video_path, fourcc, fps, (frame_width, frame_height))

# --- NEW: DEBUGGING STEP 3 ---
# Check if the VideoWriter was created successfully
if not out.isOpened():
    print(f"--- ERROR ---")
    print(f"Could not create output video file: {output_video_path}")
    print("This might be a codec or permissions issue.")
    exit()
else:
    print(f"Successfully created output video file: {output_video_path}")


# --- 5. Start Your Loop ---
frame_count = 0  # We'll use this for debugging
print("Processing video... Press 'q' to stop early.")

while cap.isOpened():
    success, frame = cap.read()
    if not success:
        print("\nVideo processing complete.")
        break  # End of video

    # 1. Run inference
    results = model(frame, verbose=False)
    
    # ... (Your engagement logic) ...
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
    if total_students > 0:
        engagement_score = (engaged_count / total_students) * 100
    else:
        engagement_score = 0

    # 6. Draw the boxes and score
    annotated_frame = results[0].plot(img=frame)
    
    score_text = f"Engagement: {engagement_score:.1f}%"
    cv2.putText(annotated_frame, score_text, (20, 90),
                cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 3)

    # --- NEW: DEBUGGING STEP 4 ---
    # We will print the shape of the *first frame only* to check for a size mismatch
    if frame_count == 0:
        print(f"Shape of annotated frame: {annotated_frame.shape}")
        # Check for mismatch
        if (annotated_frame.shape[1], annotated_frame.shape[0]) != (frame_width, frame_height):
            print(f"--- POTENTIAL ERROR ---")
            print(f"Frame size mismatch! VideoWriter expects ({frame_width}, {frame_height})")
            print(f"But got ({annotated_frame.shape[1]}, {annotated_frame.shape[0]})")
            
    # 7. Write the frame to the file
    out.write(annotated_frame)
    frame_count += 1
    
    # Optional: Show a window so you can see it's working
    cv2.imshow("Processing...", annotated_frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        print("\nProcessing stopped by user.")
        break

# --- 8. Release Everything ---
print(f"Releasing video resources... Wrote {frame_count} frames.")
cap.release()
out.release()
cv2.destroyAllWindows()

print(f"All done! Your demo video is saved as: {output_video_path}")
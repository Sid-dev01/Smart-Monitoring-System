# import cv2
# from ultralytics import YOLO

# # --- Part 1: Setup ---

# # Load the pre-trained YOLOv8 'nano' model
# model = YOLO('yolov8n.pt')

# # Get the class names from the model
# model_names = model.names

# # This is our PERMANENT dictionary to store the *highest* count
# # of each object ever seen in a single frame.
# all_time_max_counts = {}

# # Open your webcam
# cap = cv2.VideoCapture(0)

# # Define the name of the window
# window_name = 'YOLOv8 Live Detection'

# print("Starting webcam... Press 'q' or close the window to quit.")

# # --- Part 2: The Live Loop ---

# while True:
#     # Read one frame from the camera
#     success, frame = cap.read()
    
#     if not success:
#         print("Failed to grab frame.")
#         break

#     # --- Detection and Counting Logic ---
    
#     # 1. Run YOLO on the current frame
#     results = model(frame)

#     # 2. This is our TEMPORARY dictionary that resets for *this frame*
#     current_frame_counts = {}

#     # 3. Loop through all the boxes YOLO found in this frame
#     for box in results[0].boxes:
#         class_id = int(box.cls[0])
#         class_name = model_names[class_id]
        
#         # Add this object to our TEMPORARY frame counter
#         current_frame_counts[class_name] = current_frame_counts.get(class_name, 0) + 1

#     # 4. Update our PERMANENT 'all_time_max_counts' dictionary
#     for class_name, current_count in current_frame_counts.items():
#         previous_max = all_time_max_counts.get(class_name, 0)
        
#         if current_count > previous_max:
#             all_time_max_counts[class_name] = current_count

#     # --- Display Logic ---

#     # 5. Draw the boxes and labels onto the frame
#     annotated_frame = results[0].plot()

#     # 6. Display the LIVE counts on the annotated frame
#     y_position = 30
#     for class_name, count in current_frame_counts.items():
#         text = f"{class_name}: {count}"
#         cv2.putText(
#             annotated_frame,
#             text,
#             (10, y_position),
#             cv2.FONT_HERSHEY_SIMPLEX,
#             1,
#             (0, 255, 0), # Green color
#             2
#         )
#         y_position += 30

#     # 7. Show the final, annotated frame in a window
#     cv2.imshow(window_name, annotated_frame)

#     # --- Part 3: The NEW Quitting Logic ---

#     # Wait for 1ms for a key press
#     key = cv2.waitKey(1) & 0xFF

#     # Check if the 'q' key was pressed
#     if key == ord('q'):
#         print("'q' key pressed. Exiting...")
#         break
    
#     # Check if the window's 'X' button was clicked
#     # We do this by checking if the window property is still visible
#     try:
#         if cv2.getWindowProperty(window_name, cv2.WND_PROP_VISIBLE) < 1:
#             print("Window closed. Exiting...")
#             break
#     except cv2.error:
#         # This will catch an error if the window is forcefully closed
#         print("Window error. Exiting...")
#         break

# # --- Part 4: The Final Summary ---

# # This code runs *after* the loop breaks (by pressing 'q' or closing window)

# print("\n--- Webcam Closed ---")
# print("\nFinal Summary (Maximum number of each object seen at one time):")

# if not all_time_max_counts:
#     print("No objects were detected.")
# else:
#     # Loop through our permanent dictionary and print the results
#     for object_name, max_count in all_time_max_counts.items():
#         print(f"- {object_name}: {max_count}")

# # Clean up
# cap.release()
# cv2.destroyAllWindows()
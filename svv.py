import cv2

# Load the face detection classifier from OpenCV
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Load the picture you want to use as a replacement
replacement_image = cv2.imread('replacement_image.png')  # Change to your replacement image

# Define the codec and create a VideoWriter object
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter('output.avi', fourcc, 20.0, (640, 480))

# Open a connection to the webcam (usually 0 for the default webcam)
cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Convert the frame to grayscale for face detection   https://github.com/Yopkat/quiz#quiz
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect faces in the frame
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

    # Loop through the detected faces and replace them with the image
    for (x, y, w, h) in faces:
        replacement_face = cv2.resize(replacement_image, (w, h))
        frame[y:y+h, x:x+w] = replacement_face

    # Write the frame to the output file
    out.write(frame)

    cv2.imshow('Face Replacement', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release everything and close the video window
cap.release()
out.release()
cv2.destroyAllWindows()

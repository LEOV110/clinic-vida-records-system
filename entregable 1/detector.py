# pip install opencv-python
import cv2
from camera import getcamera


camera = getcamera()
cap = cv2.VideoCapture(camera, cv2.CAP_DSHOW)
faceClassif = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

while True:
    
    ret, frame = cap.read()

    if not ret:
        break
    gray=cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = faceClassif.detectMultiScale(gray,
    scaleFactor=1.1,
    minNeighbors=5,
    minSize=(120, 120),
    maxSize=(1000, 1000))
    
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

    cv2.imshow('frame', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

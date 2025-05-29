import cv2
import os
import imutils
from camera import getcamera

print('Escribe tu nombre:')
personName = input()
dataPath = './data'
personPath = os.path.join(dataPath, personName)

if os.path.exists(personPath):
    print('Persona ya registrada, sobreescribiendo datos...')
else:
    os.makedirs(personPath)
    print('Nueva persona, capturando datos...')

# abrir la cámara
camera = getcamera()
cap = cv2.VideoCapture(camera, cv2.CAP_DSHOW)

# Cargar el detector de rostros (cambiar la ruta por una válida si es necesario)
faceClassifier = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

if faceClassifier.empty():
    print("Error: no se pudo cargar el clasificador de rostros.")
    exit()

contador = 0

while True:
    ret, frame = cap.read()

    if not ret:
        print("No se pudo leer la cámara")
        break

    frame = imutils.resize(frame, width=640)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = faceClassifier.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(120, 120),
        maxSize=(1000, 1000)
    )

    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
        rostro = frame[y:y+h, x:x+w]
        rostro = cv2.resize(rostro, (150, 150), interpolation=cv2.INTER_CUBIC)

        # Guardar rostro
        cv2.imwrite(os.path.join(personPath, f'rostro_{contador}.jpg'), rostro)
        print(f'rostro_{contador}.jpg guardado')
        contador += 1

    cv2.imshow("M1 cámara", frame)
    if contador >= 300 or cv2.waitKey(1) & 0xFF == ord('q'):
        break

cv2.destroyAllWindows()
cap.release()

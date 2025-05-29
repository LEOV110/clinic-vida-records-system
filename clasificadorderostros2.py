import cv2
import os
from camera import getcamera  


dataPath = './data'
try:
    imagePaths = os.listdir(dataPath)
except FileNotFoundError:
    print(f"La carpeta {dataPath} no existe.")
    exit()

print('imagens =', imagePaths)

# Crear el recognizer de rostros LBPH
faceRecognizer = cv2.face.LBPHFaceRecognizer_create()

# Leer el modelo entrenado
try:
    faceRecognizer.read('modelo.xml')
except cv2.error as e:
    print("Error al leer el archivo 'modelo.xml':", e)
    exit()

# Crear el clasificador de rostros
try:
    faceClassif = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    if faceClassif.empty():
        raise IOError('No se pudo cargar el clasificador haarcascade_frontalface_default.xml')
except Exception as e:
    print("Error al cargar el clasificador:", e)
    exit()

# Obtener la cámara
camera_id = getcamera()
cap = cv2.VideoCapture(camera_id, cv2.CAP_DSHOW)

if not cap.isOpened():
    print(f"No se pudo abrir la cámara con id {camera_id}")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        print("No se pudo leer el frame de la cámara")
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    auxFrame = gray.copy()

    # Detectar rostros en la imagen
    faces = faceClassif.detectMultiScale(gray, 1.3, 5)

    for (x, y, w, h) in faces:
        rostro = auxFrame[y:y+h, x:x+w]
        rostro = cv2.resize(rostro, (150, 150))
        result = faceRecognizer.predict(rostro)

        # result[0]: label, result[1]: confianza
        if result[1] < 75:
            label = imagePaths[result[0]]
            color = (0, 255, 0)
            texto = '{}'.format(label)
        else:
            label = 'Desconocido'
            color = (0, 0, 255)
            texto = label

        # Dibujar rectángulo y texto
        cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
        cv2.putText(frame, texto, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.8, color, 2)

    cv2.imshow('Reconocimiento Facial', frame)

    # Salir si se presiona la tecla 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Liberar recursos
cap.release()
cv2.destroyAllWindows()

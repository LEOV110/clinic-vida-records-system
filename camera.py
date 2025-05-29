# -------------------------------------------------------------------------
# Crack the Code
# Inteligencia Artificial con Python
# Sesion 1 - Detector de rostros
# No modifiques este archivo
# -------------------------------------------------------------------------
# Importar bibliotecas que se utilizarán
import cv2


# Detecta qué camara esta disponible
def getcamera():
    for i in range(8):
        c = cv2.VideoCapture(i, cv2.CAP_DSHOW)
        if c is None or not c.isOpened():
            print('Warning: unable to open video source: ', i)
        else:
            print('Camera found in video source: ', i)
            c.release()
            return i

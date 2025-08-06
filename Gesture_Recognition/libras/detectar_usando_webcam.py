# VERSÃO DA JULIA

# from ultralytics import YOLO
# import cv2
# from collections import defaultdict
# import numpy as np


# # # origens possíveis: image, screenshot, URL, video, YouTube, Streams -> ESP32 / Intelbras / Cameras On-Line
# # # mais informações em https://docs.ultralytics.com/modes/predict/#inference-sources

# # cap = cv2.VideoCapture(0)
# # #cap = cv2.VideoCapture(1, cv2.CAP_DSHOW)

# # # Usa modelo da Yolo
# # # Model	    size    mAPval  Speed       Speed       params  FLOPs
# # #           (pixels) 50-95  CPU ONNX A100 TensorRT   (M)     (B)
# # #                           (ms)        (ms)
# # # YOLOv8n	640	    37.3	80.4	    0.99	    3.2	    8.7
# # # YOLOv8s	640	    44.9	128.4	    1.20	    11.2	28.6
# # # YOLOv8m	640	    50.2	234.7	    1.83	    25.9	78.9
# # # YOLOv8l	640	    52.9	375.2	    2.39	    43.7	165.2
# # # YOLOv8x	640	    53.9	479.1	    3.53	    68.2	257.8

# ############### confundindo:
# ## Q,N


# class ClassifierLibras:
#     def __init__(self, model, seguir, rastro):
#         self.model = YOLO(model)
#         self.seguir = seguir
#         self.rastro = rastro
#         self.track_history = defaultdict(lambda: [])
#         self.cap = cv2.VideoCapture(0)
        
#     def main(self):
#         while True:
#             success, img = self.cap.read()

#             if success:
#                 if self.seguir:
#                     results = self.model.track(img, persist=True)
#                 else:
#                     results = self.model(img)

#                 # Process results list
#                 for result in results:
#                     # Visualize the results on the frame
#                     img = result.plot()
                    
#                     # print("Probabilidade: ", result[0].probs)
#                     # for i, prob in enumerate(result[0].probs):
#                     #         print(f"Class {i}: {prob}")
#                     # # 
                    
#                     # print("Names", result[0].probs)

#                     if self.seguir and self.rastro:
#                         try:
#                             # Get the boxes and track IDs
#                             boxes = result.boxes.xywh.gpu()
#                             track_ids = result.boxes.id.int().gpu().tolist()

#                             # Plot the tracks
#                             for box, track_id in zip(boxes, track_ids):
#                                 x, y, w, h = box
#                                 track = self.track_history[track_id]
#                                 track.append((float(x), float(y)))  # x, y center point
#                                 if len(track) > 30:  # retain 90 tracks for 90 frames
#                                     track.pop(0)

#                                 # Draw the tracking lines
#                                 points = np.hstack(track).astype(np.int32).reshape((-1, 1, 2))
#                                 cv2.polylines(img, [points], isClosed=False, color=(230, 0, 0), thickness=5)
#                         except:
#                             pass

#                 cv2.imshow("Tela", img)

#             k = cv2.waitKey(1)
#             if k == ord('q'):
#                 break
            
#         self.cap.release()
#         cv2.destroyAllWindows()
#         print("desligando")

# if __name__ == '__main__':
#     classifier = ClassifierLibras(model = "D:\\CROS\\blockly-ROS-project\\Gesture_Recognition\\libras\\runs\\detect\\train\\weights\\best.pt", seguir =True, rastro = False)
#     classifier.main()

# ================================================

# MINHA VERSÃO

# import os
# os.environ['KMP_DUPLICATE_LIB_OK'] = 'TRUE'

# from ultralytics import YOLO
# import cv2
# from collections import defaultdict
# import numpy as np

# class ClassifierLibras:
#     def __init__(self, model, seguir, rastro):
#         self.model = YOLO(model)
#         self.seguir = seguir
#         self.rastro = rastro
#         self.track_history = defaultdict(lambda: [])
#         self.cap = cv2.VideoCapture(0)
        
#     def main(self):
#         while True:
#             success, img = self.cap.read()

#             if success:
#                 if self.seguir:
#                     results = self.model.track(img, persist=True)
#                 else:
#                     results = self.model(img)

#                 # Processar a lista de resultados
#                 for result in results:
#                     # Visualizar os resultados no frame
#                     img = result.plot()
                    
#                     if self.seguir and self.rastro:
#                         try:
#                             # Obter as caixas e IDs de rastreamento
#                             boxes = result.boxes.xywh.gpu()
#                             track_ids = result.boxes.id.int().gpu().tolist()

#                             # Plotar os rastreamentos
#                             for box, track_id in zip(boxes, track_ids):
#                                 x, y, w, h = box
#                                 track = self.track_history[track_id]
#                                 track.append((float(x), float(y)))  # ponto central x, y
#                                 if len(track) > 30:  # reter 90 rastreamentos por 90 frames
#                                     track.pop(0)

#                                 # Desenhar as linhas de rastreamento
#                                 points = np.hstack(track).astype(np.int32).reshape((-1, 1, 2))
#                                 cv2.polylines(img, [points], isClosed=False, color=(230, 0, 0), thickness=5)
#                         except:
#                             pass

#                 cv2.imshow("Tela", img)

#             k = cv2.waitKey(1)
#             if k == ord('q'):
#                 break
            
#         self.cap.release()
#         cv2.destroyAllWindows()
#         print("desligando")

# if __name__ == '__main__':
#     classifier = ClassifierLibras(model = "D:\\CROS\\blockly-ROS-project\\Gesture_Recognition\\libras\\runs\\detect\\train\\weights\\best.pt", seguir =True, rastro = False)
#     classifier.main()

# ======================================

# MINHA VERSÃO COM PAUSAS

import os
os.environ['KMP_DUPLICATE_LIB_OK'] = 'TRUE'

from ultralytics import YOLO
import cv2
from collections import defaultdict
import numpy as np
import time

class ClassifierLibras:
    def __init__(self, model, seguir, rastro):
        self.model = YOLO(model)
        self.seguir = seguir
        self.rastro = rastro
        self.track_history = defaultdict(lambda: [])
        self.cap = cv2.VideoCapture(0)
        
    def main(self):
        # Exibir a mensagem "Captura Iniciada" por 1 segundo
        start_time = time.time()

        # Iniciar a classificação por 2 segundos
        classification_results = None
        detected_class = None  # Variável para armazenar a classe detectada
        start_time = time.time()
        while time.time() - start_time < 7:
            success, img = self.cap.read()
            if success:
                cv2.putText(img, "Captura Iniciada", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
                cv2.imshow("Tela", img)
                if self.seguir:
                    results = self.model.track(img, persist=True)
                else:
                    results = self.model(img)

                # Processar os resultados
                for result in results:
                    img = result.plot()  # Visualizar os resultados no frame
                    classification_results = img  # Salvar o último resultado para exibição posterior

                    # Capturar a classe detectada
                    if result.boxes is not None and len(result.boxes) > 0:
                        detected_class_id = result.boxes.cls[0].item()  # ID da classe detectada
                        detected_class = result.names[detected_class_id]  # Nome da classe detectada

                cv2.imshow("Tela", img)
            cv2.waitKey(1)

        # Exibir o resultado da classificação por 2 segundos (congelar a imagem)
        if classification_results is not None:
            start_time = time.time()
            while time.time() - start_time < 3:
                cv2.imshow("Tela", classification_results)
                cv2.waitKey(1)

        # Fechar a câmera
        self.cap.release()
        cv2.destroyAllWindows()
        print("Câmera desligada")

        # Retornar a classe detectada
        if detected_class is not None:
            print(f"Classe detectada: {detected_class}")
            return detected_class
        else:
            print("Nenhuma classe detectada.")
            return None

if __name__ == '__main__':
    classifier = ClassifierLibras(
        model="D:\\CROS\\blockly-ROS-project\\Gesture_Recognition\\libras\\runs\\detect\\train\\weights\\best.pt",
        seguir=True,
        rastro=False
    )
    detected_class = classifier.main()
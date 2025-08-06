from labirinto import labirinto
from detectar_usando_webcam import ClassifierLibras

classifier = ClassifierLibras(model = "runs/detect/train/weights/best.pt", seguir = True, rastro = False)
classifier.main()
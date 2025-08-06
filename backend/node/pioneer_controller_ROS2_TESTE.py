import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from nav_msgs.msg import Odometry
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import Response
import math
import threading
from ultralytics import YOLO
import cv2
from collections import defaultdict
import numpy as np
import time
import base64
import requests




app = Flask(__name__)
CORS(app)

# Variáveis globais para armazenar a posição e orientação atual do robô
posicao_atual = {'x': 0.0, 'y': 0.0}
orientacao_atual = 0.0
# Lista para armazenar dados de odometria
odometry_log = []
start_time = None


# ============== CONTROLADOR PIONEER ==================================================================================
class PioneerController(Node):
    def __init__(self):
        super().__init__('pioneer_controller')
        self.publisher_ = self.create_publisher(Twist, 'cmd_vel', 10)
        self.subscription = self.create_subscription(
            Odometry,  # Usando Odometry, pois /pose publica esse tipo de mensagem
            'pose',    # Tópico /pose
            self.odometry_callback,
            10)
        self.subscription  # prevent unused variable warning

    def odometry_callback(self, msg):
        global posicao_atual, orientacao_atual
        # Atualiza a posição atual do robô
        posicao_atual['x'] = msg.pose.pose.position.x
        posicao_atual['y'] = msg.pose.pose.position.y

        # Atualiza a orientação atual do robô
        orientation_q = msg.pose.pose.orientation
        roll, pitch, yaw = self.euler_from_quaternion(
            orientation_q.x, orientation_q.y, orientation_q.z, orientation_q.w)
        orientacao_atual = yaw
        # Salva dados de odometria
        odometry_log.append([
            msg.pose.pose.position.x,
            msg.pose.pose.position.y,
            msg.pose.pose.position.z,
            orientacao_atual,
            time.time()
        ])


    def euler_from_quaternion(self, x, y, z, w):
        """
        Converte quaternion para ângulos de Euler (roll, pitch, yaw).
        """
        t0 = +2.0 * (w * x + y * z)
        t1 = +1.0 - 2.0 * (x * x + y * y)
        roll_x = math.atan2(t0, t1)

        t2 = +2.0 * (w * y - z * x)
        t2 = +1.0 if t2 > +1.0 else t2
        t2 = -1.0 if t2 < -1.0 else t2
        pitch_y = math.asin(t2)

        t3 = +2.0 * (w * z + x * y)
        t4 = +1.0 - 2.0 * (y * y + z * z)
        yaw_z = math.atan2(t3, t4)

        return roll_x, pitch_y, yaw_z

    def mover_para_frente(self, distancia):
        global posicao_atual

        twist = Twist()
        velocidade = 0.5
        # taxa_publicacao = 30
        # # # twist.linear.x = velocidade
        # rate = self.create_rate(taxa_publicacao)

        # Armazena a posição inicial
        posicao_inicial = posicao_atual.copy()

        # Calcula a distância percorrida
        distancia_percorrida = 0.0

        erro = distancia - distancia_percorrida
        
        while erro > 0.01:
            self.publisher_.publish(twist)
            # rate.sleep()

            # Atualiza a distância percorrida
            distancia_percorrida = math.sqrt(
                (posicao_atual['x'] - posicao_inicial['x']) ** 2 +
                (posicao_atual['y'] - posicao_inicial['y']) ** 2
            )

            erro = distancia - distancia_percorrida

            twist.linear.x = math.tanh(erro * velocidade)

            self.get_logger().info(f"Distância percorrida: {distancia_percorrida} metros,  Erro: {erro}")

        self.parar()

    def girar(self, angulo):
        global orientacao_atual

        twist = Twist()

        # Define o sinal da rotação (direção)
        direcao = 1 if angulo > 0 else -1
        ganho = 1.5  # quanto maior, mais agressivo o giro

        # Calcula o ângulo desejado
        angulo_desejado = orientacao_atual + math.radians(angulo)
        angulo_desejado = self.normalizar_angulo(angulo_desejado)

        while abs(self.normalizar_angulo(angulo_desejado - orientacao_atual)) > 0.01:
            erro = self.normalizar_angulo(angulo_desejado - orientacao_atual)

            # Estratégia proporcional simples com tanh e controle de direção
            twist.angular.z = math.tanh(abs(erro) * ganho) * direcao

            self.publisher_.publish(twist)

            self.get_logger().info(
                f"Ângulo desejado: {math.degrees(angulo_desejado):.2f}°, "
                f"Orientação atual: {math.degrees(orientacao_atual):.2f}°, "
                f"Erro: {math.degrees(erro):.2f}°, "
                f"Velocidade angular: {twist.angular.z:.4f}"
            )

        self.parar()


    def normalizar_angulo(self, angulo):
        """
        Normaliza o ângulo para o intervalo [-pi, pi].
        """
        while angulo > math.pi:
            angulo -= 2 * math.pi
        while angulo < -math.pi:
            angulo += 2 * math.pi
        return angulo

    def parar(self):
        twist = Twist()
        twist.linear.x = 0.0
        twist.angular.z = 0.0
        self.publisher_.publish(twist)
        self.get_logger().info("Robô parado")
# ===============================================================================================================        

# Inicializa o nó ROS 2 em uma thread separada
def ros_thread():
    rclpy.init()
    global ros_node
    ros_node = PioneerController()
    rclpy.spin(ros_node)
    ros_node.destroy_node()
    rclpy.shutdown()

thread = threading.Thread(target=ros_thread)
thread.start()

# ============== ROTA PARA O CONTROLADOR ==================================================================================
# Adicione no início do arquivo, com outras variáveis globais
last_gesture_result = None  # ← Adicione esta linha

@app.route('/execute', methods=['POST'])
def executar():
    global last_gesture_result
    global start_time, odometry_log
    


    try:
        start_time = time.time()
        # odometry_log = []
        data = request.get_json()
        print("Comandos recebidos:", data)

        if not isinstance(data, list):
            return jsonify(status="Erro: Esperado um array de comandos"), 400

        resultados = []

        # 1. Executa primeiro comandos de setup, como set_gesture_result
        for comando in data:
            if comando.get('action') == "set_gesture_result":
                print("[PRE-EXEC] Processando set_gesture_result...")
                resultados.append(execute_generic_command(comando))

        # 2. Em seguida, executa conditional_execution
        for comando in data:
            if comando.get('action') == "conditional_execution":
                print("[CONDICIONAL] Processando conditional_execution...")
                condition = comando.get('condition', 'False')
                condition = condition.replace('resultado', 'last_gesture_result')
                print("last_gesture_result atual:", last_gesture_result)
                print("Condição avaliada como:", condition)
                condition_result = eval(condition)

                print(f"Condição '{condition}' avaliada como: {condition_result}")

                if condition_result:
                    for cmd in comando.get('commands', []):
                        resultados.append(execute_generic_command(cmd))

        # 3. Executa qualquer outro comando normal
        for comando in data:
            action = comando.get('action')
            if action not in ["set_gesture_result", "conditional_execution"]:
                print(f"[NORMAL] Processando ação: {action}")
                resultados.append(execute_generic_command(comando))

        salvar_odometria_txt()

        return jsonify(resultados)

    except Exception as e:
        print(f"Erro geral no endpoint: {str(e)}")
        return jsonify({
            "status": f"Erro interno no servidor: {str(e)}",
            "error": True
        }), 500





@app.route('/classify_stream')
def classify_stream():
    def generate_frames():
        global last_gesture_result  # ⬅️ Adiciona isso

        cap = cv2.VideoCapture(0)
        if not cap.isOpened():
            yield b"--frame\r\nContent-Type: image/jpeg\r\n\r\n"  # dummy frame
            return

        model = YOLO("D:\\ICAR\\blockly-ROS-project\\Gesture_Recognition\\libras\\runs\\detect\\train\\weights\\best.pt")
        seguir = True
        detected_class = None
        classification_frame = None

        start = time.time()

        while True:
            elapsed = time.time() - start
            ret, frame = cap.read()
            if not ret:
                break

            if elapsed < 2:
                cv2.putText(frame, "Captura Iniciada", (50, 50),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

            elif elapsed < 6:
                results = model.track(frame, persist=True) if seguir else model(frame)
                for result in results:
                    frame = result.plot()
                    classification_frame = frame
                    if result.boxes is not None and len(result.boxes) > 0:
                        detected_class_id = result.boxes.cls[0].item()
                        detected_class = result.names[detected_class_id]
                        last_gesture_result = detected_class  # ⬅️ Atualiza o valor global
                        if last_gesture_result == 'D2':
                            last_gesture_result = 'D'

            elif elapsed < 10:
                if classification_frame is not None:
                    frame = classification_frame.copy()
                if detected_class:
                    cv2.putText(frame, f"Gesto detectado: {detected_class}", (10, 30),
                                cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0, 255, 255), 3)

            else:
                break

            ret, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

        cap.release()

    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/get_last_gesture_result')
def get_last_gesture_result():
    return jsonify({"resultado": last_gesture_result})



def execute_generic_command(cmd):
    """Função genérica para executar qualquer comando"""
    global last_gesture_result

    action = cmd.get('action')

    # ✅ Retorna o último gesto classificado (resultado já atualizado no backend)
    if action == "classificar_gestos":
        return {
            "status": "Resultado do gesto retornado do backend",
            "resultado": last_gesture_result,
            "action": action
        }

    # ✅ Atualiza manualmente o resultado do gesto (opcional)
    elif action == "set_gesture_result":
        last_gesture_result = cmd.get("resultado")
        print(f"last_gesture_result atualizado para: {last_gesture_result}")
        return {
            "status": "Resultado do gesto atualizado no backend",
            "resultado": last_gesture_result,
            "action": "set_gesture_result"
        }

    # ✅ Comandos do robô
    elif action in ["move_forward", "turn", "stop"]:
        action_map = {
            "move_forward": (ros_node.mover_para_frente, "distance"),
            "turn": (ros_node.girar, "angle"),
            "stop": (ros_node.parar, None)
        }

        func, param = action_map[action]
        if param:
            param_value = cmd.get(param, 0)
            func(param_value)
        else:
            func()

        return {
            "status": f"Comando {action} executado com sucesso",
            "action": action,
            **({param: param_value} if param else {})
        }

    # ❌ Comando não reconhecido
    return {
        "status": f"Ação não implementada: {action}",
        "error": True,
        "action": action
    }


# ===========================================================================================================================    

def salvar_odometria_txt():
    if odometry_log:
        timestamp_str = time.strftime("%Y-%m-%d_%H-%M-%S")
        filename = f"odometry_{timestamp_str}.txt"
        with open(filename, 'w') as file:
            file.write("x          y          z          psi        time\n")
            for data in odometry_log:
                file.write(f"{data[0]:<10} {data[1]:<10} {data[2]:<10} {data[3]:<10} {data[4]:<10}\n")
            file.write(f"\nTempo total de execução: {time.time() - start_time:.2f} segundos\n")
        print(f"Odometry data saved in '{filename}'.")
    else:
        print("Nenhum dado de odometria coletado.")






if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
import matplotlib.pyplot as plt

def carregar_dados_odometria(caminho_arquivo):
    x_vals = []
    y_vals = []

    with open(caminho_arquivo, 'r') as file:
        linhas = file.readlines()

        for linha in linhas[1:]:  # pula o cabeçalho
            if linha.strip() == "":
                continue  # ignora linhas em branco (como a do tempo final)
            try:
                partes = linha.split()
                x = float(partes[0])
                y = float(partes[1])
                x_vals.append(x)
                y_vals.append(y)
            except:
                continue  # ignora qualquer linha mal formatada

    return x_vals, y_vals

def plotar_trajetoria(x_vals, y_vals):
    plt.figure(figsize=(8, 6))
    plt.plot(x_vals, y_vals, marker='o', linestyle='-', color='blue')
    plt.title('Trajetória do Robô')
    plt.xlabel('Posição X (m)')
    plt.ylabel('Posição Y (m)')
    plt.grid(True)
    plt.axis('equal')
    plt.show()

# Caminho do arquivo .txt
caminho = 'odometry_2025-04-24_08-57-30.txt'

# Carrega e plota
x, y = carregar_dados_odometria(caminho)
plotar_trajetoria(x, y)

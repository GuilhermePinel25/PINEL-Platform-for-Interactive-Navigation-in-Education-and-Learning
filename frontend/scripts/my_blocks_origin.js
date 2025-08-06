// =================== BLOCO IF =================

// Bloco IF personalizado
Blockly.Blocks['my_controls_if'] = {
  init: function() {
    this.appendValueInput('IF0')
        .setCheck('Boolean')
        .appendField('if');
    this.appendStatementInput('DO0')
        .appendField('do');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("Executa os blocos internos se a condição for verdadeira.");
    this.setHelpUrl("");
  }
};


javascript.javascriptGenerator.forBlock['my_controls_if'] = function(block) {
  const condition = javascript.javascriptGenerator.valueToCode(block, 'IF0', javascript.javascriptGenerator.ORDER_NONE);
  const commands = [];

  let currentBlock = block.getInputTargetBlock('DO0');
  while (currentBlock) {
    try {
      // Usa a função de geração registrada em forBlock
      const code = javascript.javascriptGenerator.forBlock[currentBlock.type](currentBlock);

      if (code && code.trim() !== '') {
        const json = JSON.parse(code.trim());
        commands.push(json);
      }
    } catch (e) {
      console.error("Erro ao gerar comando para bloco:", currentBlock.type, e);
    }

    currentBlock = currentBlock.getNextBlock(); // Anda manualmente sem encadear blocos
  }

  return JSON.stringify({
    action: "conditional_execution",
    condition: condition,
    commands: commands
  });
};

// =================== BLOCO Mover para frente =================

Blockly.Blocks['move_forward'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Mover para frente")
      .appendField(new Blockly.FieldNumber(1, 0, 100), "DISTANCE") // Field to set the distance
      .appendField("metros");
    this.setPreviousStatement(true, null); // Allows connecting blocks before this one
    this.setNextStatement(true, null); // Allows connecting blocks after this one
    this.setColour(230);
    this.setTooltip("Movimenta o robô para frente com a distância específica.");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['move_forward'] = function(block) {
  const distance = parseFloat(block.getFieldValue('DISTANCE'));
  return JSON.stringify({
    action: "move_forward",
    distance: distance
  });
};





// =================== BLOCO TURN =================
Blockly.Blocks['turn'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Rotacionar no sentido")
      .appendField(new Blockly.FieldDropdown([["Horário", "HORÁRIO"], ["Anti horário", "ANTI HORARIO"]]), "DIREÇÃO") // Field for direction
      .appendField("em")
      .appendField(new Blockly.FieldNumber(0, 0, 360), "ANGLE") // Field to set the angle
      .appendField("graus");
    this.setPreviousStatement(true, null); // Allows connecting blocks before this one
    this.setNextStatement(true, null); // Allows connecting blocks after this one
    this.setColour(130);
    this.setTooltip("Rotaciona o robô na direção e ângulo definidos");
    this.setHelpUrl("");
  },
};

javascript.javascriptGenerator.forBlock['turn'] = function (block) {
  const direction = block.getFieldValue('DIREÇÃO'); // HORÁRIO ou ANTI HORARIO
  const angle = parseFloat(block.getFieldValue('ANGLE'));
  const finalAngle = direction === "HORÁRIO" ? -angle : angle;

  return JSON.stringify({
    action: "turn",
    angle: finalAngle
  });
};


// =================== BLOCO GESTOS =================
Blockly.Blocks['classificar_gestos'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Classificar Gesto");
    this.setPreviousStatement(true, null); // Permite conectar blocos antes deste
    this.setNextStatement(true, null); // Permite conectar blocos depois deste
    this.setColour(160); // Cor do bloco
    this.setTooltip("Classifica gesto usando a webcam e retorna o resultado.");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['classificar_gestos'] = function (block) {
  return JSON.stringify({
    action: "classificar_gestos"
  });
};


// Função para chamar a API de classificação de gestos
function classificarGestos() {
  return fetch('/classificar_gestos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.resultado) {
      return data.resultado; // Retorna a classe detectada
    } else {
      throw new Error("Nenhuma classe detectada.");
    }
  });
}

// =================== BLOCO RESULT =================

Blockly.Blocks['resultado'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Resultado");
    this.setOutput(true, "String");
    this.setColour(230);
    this.setTooltip("Armazena o resultado da classificação de gestos.");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['resultado'] = function(block) {
  return ['resultado', javascript.javascriptGenerator.ORDER_ATOMIC];
};
// =================== BLOCO TEXT =================
Blockly.Blocks['texto'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(""), "TEXT");
    this.setOutput(true, "String");
    this.setColour(160);
    this.setTooltip("Insira um texto para comparação.");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['texto'] = function(block) {
  var text = block.getFieldValue('TEXT');
  return [`"${text}"`, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// COMPARAR

Blockly.Blocks['comparar'] = {
  init: function() {
    this.appendValueInput('A')
        .setCheck('String')
        .appendField("Comparar");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["==", "EQ"],
          ["!=", "NEQ"],
          [">", "GT"],
          ["<", "LT"]
        ]), "OP");
    this.appendValueInput('B')
        .setCheck('String')
        .appendField("com");
    this.setOutput(true, 'Boolean');
    this.setColour(160);
    this.setTooltip("Compara dois valores.");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['comparar'] = function(block) {
  var value_a = javascript.javascriptGenerator.valueToCode(block, 'A', javascript.javascriptGenerator.ORDER_ATOMIC);
  var dropdown_op = block.getFieldValue('OP');
  var value_b = javascript.javascriptGenerator.valueToCode(block, 'B', javascript.javascriptGenerator.ORDER_ATOMIC);

  // Mapeia os operadores para os símbolos corretos em JavaScript
  var operator = {
    'EQ': '==',
    'NEQ': '!=',
    'GT': '>',
    'LT': '<'
  }[dropdown_op];

  var code = `${value_a} ${operator} ${value_b}`;
  return [code, javascript.javascriptGenerator.ORDER_RELATIONAL];
};

// =============== GENERATE COMMANDS =====================================




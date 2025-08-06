<<<<<<< HEAD
// =================== BLOCO IF =================

// Bloco IF personalizado
Blockly.Blocks['my_controls_if'] = {
<<<<<<< HEAD
  init: function() {
    this.appendValueInput('IF0')
        .setCheck('Boolean')
        .appendField('if');
    this.appendStatementInput('DO0')
        .appendField('do');
=======
  init: function () {
    this.appendValueInput('IF0')
      .setCheck('Boolean')
      .appendField('if');
    this.appendStatementInput('DO0')
      .appendField('do');
>>>>>>> f606ba7 (at4)
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("Executa os blocos internos se a condição for verdadeira.");
    this.setHelpUrl("");
  }
};


<<<<<<< HEAD
javascript.javascriptGenerator.forBlock['my_controls_if'] = function(block) {
=======
javascript.javascriptGenerator.forBlock['my_controls_if'] = function (block) {
>>>>>>> f606ba7 (at4)
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
<<<<<<< HEAD
      .appendField("Mover para frente")
      .appendField(new Blockly.FieldNumber(1, 0, 100), "DISTANCE") // Field to set the distance
      .appendField("metros");
=======
      .appendField("Move forward")
      .appendField(new Blockly.FieldNumber(1, 0, 100), "DISTANCE") // Field to set the distance
      .appendField("meters");
>>>>>>> f606ba7 (at4)
    this.setPreviousStatement(true, null); // Allows connecting blocks before this one
    this.setNextStatement(true, null); // Allows connecting blocks after this one
    this.setColour(230);
    this.setTooltip("Movimenta o robô para frente com a distância específica.");
    this.setHelpUrl("");
  }
};

<<<<<<< HEAD
javascript.javascriptGenerator.forBlock['move_forward'] = function(block) {
=======
javascript.javascriptGenerator.forBlock['move_forward'] = function (block) {
>>>>>>> f606ba7 (at4)
  const distance = parseFloat(block.getFieldValue('DISTANCE'));
  return JSON.stringify({
    action: "move_forward",
    distance: distance
  });
};


<<<<<<< HEAD



=======
>>>>>>> f606ba7 (at4)
// =================== BLOCO TURN =================
Blockly.Blocks['turn'] = {
  init: function () {
    this.appendDummyInput()
<<<<<<< HEAD
      .appendField("Rotacionar no sentido")
      .appendField(new Blockly.FieldDropdown([["Horário", "HORÁRIO"], ["Anti horário", "ANTI HORARIO"]]), "DIREÇÃO") // Field for direction
      .appendField("em")
      .appendField(new Blockly.FieldNumber(0, 0, 360), "ANGLE") // Field to set the angle
      .appendField("graus");
=======
      .appendField("Rotate in the direction of")
      .appendField(new Blockly.FieldDropdown([["Clockwise", "HORÁRIO"], ["Counterclockwise", "ANTI HORARIO"]]), "DIREÇÃO") // Field for direction
      .appendField("em")
      .appendField(new Blockly.FieldNumber(0, 0, 360), "ANGLE") // Field to set the angle
      .appendField("degrees");
>>>>>>> f606ba7 (at4)
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
<<<<<<< HEAD
  init: function() {
    this.appendDummyInput()
        .appendField("Classificar Gesto");
=======
  init: function () {
    this.appendDummyInput()
      .appendField("Classify Gesture");
>>>>>>> f606ba7 (at4)
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
<<<<<<< HEAD
  .then(response => response.json())
  .then(data => {
    if (data.resultado) {
      return data.resultado; // Retorna a classe detectada
    } else {
      throw new Error("Nenhuma classe detectada.");
    }
  });
=======
    .then(response => response.json())
    .then(data => {
      if (data.resultado) {
        return data.resultado; // Retorna a classe detectada
      } else {
        throw new Error("Nenhuma classe detectada.");
      }
    });
>>>>>>> f606ba7 (at4)
}

// =================== BLOCO RESULT =================

Blockly.Blocks['resultado'] = {
<<<<<<< HEAD
  init: function() {
    this.appendDummyInput()
        .appendField("Resultado");
=======
  init: function () {
    this.appendDummyInput()
      .appendField("Result");
>>>>>>> f606ba7 (at4)
    this.setOutput(true, "String");
    this.setColour(230);
    this.setTooltip("Armazena o resultado da classificação de gestos.");
    this.setHelpUrl("");
  }
};

<<<<<<< HEAD
javascript.javascriptGenerator.forBlock['resultado'] = function(block) {
=======
javascript.javascriptGenerator.forBlock['resultado'] = function (block) {
>>>>>>> f606ba7 (at4)
  return ['resultado', javascript.javascriptGenerator.ORDER_ATOMIC];
};
// =================== BLOCO TEXT =================
Blockly.Blocks['texto'] = {
<<<<<<< HEAD
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(""), "TEXT");
=======
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput(""), "TEXT");
>>>>>>> f606ba7 (at4)
    this.setOutput(true, "String");
    this.setColour(160);
    this.setTooltip("Insira um texto para comparação.");
    this.setHelpUrl("");
  }
};

<<<<<<< HEAD
javascript.javascriptGenerator.forBlock['texto'] = function(block) {
=======
javascript.javascriptGenerator.forBlock['texto'] = function (block) {
>>>>>>> f606ba7 (at4)
  var text = block.getFieldValue('TEXT');
  return [`"${text}"`, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// COMPARAR

Blockly.Blocks['comparar'] = {
<<<<<<< HEAD
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
=======
  init: function () {
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
>>>>>>> f606ba7 (at4)
    this.setOutput(true, 'Boolean');
    this.setColour(160);
    this.setTooltip("Compara dois valores.");
    this.setHelpUrl("");
  }
};

<<<<<<< HEAD
javascript.javascriptGenerator.forBlock['comparar'] = function(block) {
=======
javascript.javascriptGenerator.forBlock['comparar'] = function (block) {
>>>>>>> f606ba7 (at4)
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

<<<<<<< HEAD
=======
// =================== BLOCO REPEAT PERSONALIZADO =================

Blockly.Blocks['repeat_custom'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Repeat")
      .appendField(new Blockly.FieldNumber(3, 1, 100), "TIMES")
      .appendField("times");
    this.appendStatementInput("DO")
      .setCheck(null)
      .appendField("and do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("Repete os blocos internos um número específico de vezes.");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['repeat_custom'] = function (block) {
  const times = Number(block.getFieldValue('TIMES'));
  const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');

  let loopCode = '';
  for (let i = 0; i < times; i++) {
    loopCode += statements;
  }

  return loopCode;
};


// ----Versão mais detalhada----
// Blockly.Blocks['controls_for_custom'] = {
//   init: function () {
//     this.appendDummyInput()
//         .appendField("para")
//         .appendField(new Blockly.FieldVariable("i"), "VAR")
//         .appendField("de")
//         .appendField(new Blockly.FieldNumber(1), "FROM")
//         .appendField("até")
//         .appendField(new Blockly.FieldNumber(5), "TO")
//         .appendField("passo")
//         .appendField(new Blockly.FieldNumber(1), "BY");
//     this.appendStatementInput("DO")
//         .setCheck(null)
//         .appendField("faça");
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(120);
//     this.setTooltip("Executa os blocos repetidamente com um contador.");
//     this.setHelpUrl("");
//   }
// };

// javascript.javascriptGenerator.forBlock['controls_for_custom'] = function(block) {
//   const variable = block.getFieldValue('VAR');
//   const from = Number(block.getFieldValue('FROM'));
//   const to = Number(block.getFieldValue('TO'));
//   const by = Number(block.getFieldValue('BY'));
//   const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');

//   let loopCode = '';
//   for (let i = from; i <= to; i += by) {
//     loopCode += statements;
//   }

//   return loopCode;
// };

>>>>>>> f606ba7 (at4)


=======
// =================== BLOCO IF =================

// Bloco IF personalizado
Blockly.Blocks['my_controls_if'] = {
  init: function () {
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


javascript.javascriptGenerator.forBlock['my_controls_if'] = function (block) {
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
      .appendField("Move forward")
      .appendField(new Blockly.FieldNumber(1, 0, 100), "DISTANCE") // Field to set the distance
      .appendField("meters");
    this.setPreviousStatement(true, null); // Allows connecting blocks before this one
    this.setNextStatement(true, null); // Allows connecting blocks after this one
    this.setColour(230);
    this.setTooltip("Movimenta o robô para frente com a distância específica.");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['move_forward'] = function (block) {
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
      .appendField("Rotate in the direction of")
      .appendField(new Blockly.FieldDropdown([["Clockwise", "HORÁRIO"], ["Counterclockwise", "ANTI HORARIO"]]), "DIREÇÃO") // Field for direction
      .appendField("em")
      .appendField(new Blockly.FieldNumber(0, 0, 360), "ANGLE") // Field to set the angle
      .appendField("degrees");
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
  init: function () {
    this.appendDummyInput()
      .appendField("Classify Gesture");
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
  init: function () {
    this.appendDummyInput()
      .appendField("Result");
    this.setOutput(true, "String");
    this.setColour(230);
    this.setTooltip("Armazena o resultado da classificação de gestos.");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['resultado'] = function (block) {
  return ['resultado', javascript.javascriptGenerator.ORDER_ATOMIC];
};
// =================== BLOCO TEXT =================
Blockly.Blocks['texto'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput(""), "TEXT");
    this.setOutput(true, "String");
    this.setColour(160);
    this.setTooltip("Insira um texto para comparação.");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['texto'] = function (block) {
  var text = block.getFieldValue('TEXT');
  return [`"${text}"`, javascript.javascriptGenerator.ORDER_ATOMIC];
};

// COMPARAR

Blockly.Blocks['comparar'] = {
  init: function () {
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

javascript.javascriptGenerator.forBlock['comparar'] = function (block) {
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

// =================== BLOCO REPEAT PERSONALIZADO =================

Blockly.Blocks['repeat_custom'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Repeat")
      .appendField(new Blockly.FieldNumber(3, 1, 100), "TIMES")
      .appendField("times");
    this.appendStatementInput("DO")
      .setCheck(null)
      .appendField("and do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("Repete os blocos internos um número específico de vezes.");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['repeat_custom'] = function (block) {
  const times = Number(block.getFieldValue('TIMES'));
  const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');

  let loopCode = '';
  for (let i = 0; i < times; i++) {
    loopCode += statements;
  }

  return loopCode;
};


// ----Versão mais detalhada----
// Blockly.Blocks['controls_for_custom'] = {
//   init: function () {
//     this.appendDummyInput()
//         .appendField("para")
//         .appendField(new Blockly.FieldVariable("i"), "VAR")
//         .appendField("de")
//         .appendField(new Blockly.FieldNumber(1), "FROM")
//         .appendField("até")
//         .appendField(new Blockly.FieldNumber(5), "TO")
//         .appendField("passo")
//         .appendField(new Blockly.FieldNumber(1), "BY");
//     this.appendStatementInput("DO")
//         .setCheck(null)
//         .appendField("faça");
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(120);
//     this.setTooltip("Executa os blocos repetidamente com um contador.");
//     this.setHelpUrl("");
//   }
// };

// javascript.javascriptGenerator.forBlock['controls_for_custom'] = function(block) {
//   const variable = block.getFieldValue('VAR');
//   const from = Number(block.getFieldValue('FROM'));
//   const to = Number(block.getFieldValue('TO'));
//   const by = Number(block.getFieldValue('BY'));
//   const statements = javascript.javascriptGenerator.statementToCode(block, 'DO');

//   let loopCode = '';
//   for (let i = from; i <= to; i += by) {
//     loopCode += statements;
//   }

//   return loopCode;
// };



>>>>>>> 55ee050 (Atualizações locais antes de integrar com o repositório remoto)

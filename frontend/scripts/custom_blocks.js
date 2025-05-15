import * as Blockly from '../blockly/core';
import {javascriptGenerator, Order} from '../blockly/generators/javascript';

const Mover_para_frente = {
    init: function() {
      this.appendDummyInput('')
        .appendField('Mover para frente')
        .appendField(new Blockly.FieldNumber(0, 0, 100), 'Distância');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('Mover para frente');
      this.setHelpUrl('');
      this.setColour(165);
    }
};
Blockly.common.defineBlocks({Mover_para_frente: Mover_para_frente});
                      
javascriptGenerator.forBlock['Mover_para_frente'] = function() {
    const number_distncia = block.getFieldValue('Distância');
  
    // TODO: Assemble javascript into the code variable.
    const code = '...';
    return code;
}









// Blockly.Blocks['mover_para_frente'] = {
//     init: function() {
//         this.appendDummyInput()
//             .appendField("Mover para frente")
//             .appendField(new Blockly.FieldNumber(0, 0, 100), "DISTANCIA");
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setColour(160);
//         this.setTooltip("Mover para frente");
//         this.setHelpUrl("");
//     }
// };

// Blockly.Blocks['girar'] = {
//     init: function() {
//         this.appendDummyInput()
//             .appendField("Girar")
//             .appendField(new Blockly.FieldNumber(0), "ANGULO");
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setColour(160);
//         this.setTooltip("Gira o robô.");
//         this.setHelpUrl("");
//     }
// };

// Blockly.Blocks['parar'] = {
//     init: function() {
//         this.appendDummyInput()
//             .appendField("Parar");
//         this.setPreviousStatement(true, null);
//         this.setNextStatement(true, null);
//         this.setColour(160);
//         this.setTooltip("Para o robô.");
//         this.setHelpUrl("");
//     }
// };
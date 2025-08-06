
import { javascriptGenerator } from '../blockly/generators/javascript/javascript_generator';



// Gerador para o bloco "mover_para_frente"
javascriptGenerator['mover_para_frente'] = function(block) {
    const distancia = block.getFieldValue('DISTANCIA');
    const code = `mover_para_frente(${distancia});\n`;
    return code;
};

// Gerador para o bloco "girar"
javascriptGenerator['girar'] = function(block) {
    const angulo = block.getFieldValue('ANGULO');
    const code = `girar(${angulo});\n`;
    return code;
};

// Gerador para o bloco "parar"
javascriptGenerator['parar'] = function(block) {
    const code = 'parar();\n';
    return code;
};

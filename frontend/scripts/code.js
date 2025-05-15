


Blockly.Blocks['run_code'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Run code")
        .appendField(new Blockly.FieldTextInput("#Enter your own python code"), "CODE_TEXT");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('http://erlerobotics.com/docs/Robot_Operating_System/ROS/Blockly/Intro.html');
  }
};

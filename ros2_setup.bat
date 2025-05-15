@echo off

:: Iniciar RTI Connext DDS
call "C:\Program Files\rti_connext_dds-7.3.0\resource\scripts\rtisetenv_x64Win64VS2017.bat"

:: Iniciar setup do ROS 2
call C:\dev\ros2_humble\local_setup.bat

:: Configurar o ROS_DOMAIN_ID
set ROS_DOMAIN_ID=0

:: Exibir uma mensagem indicando que o ambiente está pronto
echo ROS 2 environment initialized. ROS_DOMAIN_ID is set to %ROS_DOMAIN_ID%.

:: Manter a janela do CMD aberta
cmd

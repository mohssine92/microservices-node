https://www.tutorialesprogramacionya.com/mysqlya/temarios/descripcion.php?cod=38 

- video 18 explicacion de api y servicios - microservicios arquetectura a seguir 

-----------------------------------------------------------------------------------------------------------------------
- en caso de no querer trabajar con micro sirvico db volver a este commit y copiar proyecto sera buen pundo de inicio |
commit e4615f30857ece54433232b5c78077ac9a2b3fcf (HEAD -> master)                                                      |
Author: mohssine92 <mohssinelmariouh@gmail.com>
Date:   Wed Jan 5 15:48:43 2022 +0100

    posts/like
------------------------------------------------------------------------------------------------------------------------   


-------------------------video 21 : arquetectura ------microservicios horizontal - entidades creciendo 



-----------------------------pm2 ---- Gestor de process de nodejs----------------------------------------
pm2 logs  : todos logs pero no es nada de nuestro sytema
pm2 status : ver procesos activos de node 
pm2 start api/index.js  : iniciar proceso de api (primer proceso)
pm2 start mysql/index.js  : otro proceso de node js (segungo micro servicio )
pm2 start post/index.js (video 22)
pm2 logs : despues de start los micros servicios salen todos logs de nuestros microservicios en tiempo real 
           + los logs que hemis implementado en acciones de nuestros micros servicios  

---- si queremos ver solos los logs de un micro servicio
pm2 satus (salen los procesos con ids incremental )
pm2 logs 0 : ver solos los logs de un proceso por su id en este caso id=0

------------stopes services
 pm2 stop 0 1 2  : todos 
 pm2 stop 0  : o uno por uno 
------ reiniciar
pm2 restart 3


------------Creacion de llave ssh ----------------------
ssh % ssh-keygen -t rsa -C "mohcineikkou@gmail.com - deploy-key"
NB: No debe tener dos llaves ssh en mi maquina con mismo nombre . es conflicto
respuesta : deploy digamos quiero guardar aqui , -t es tipo de llave es rsa 

---- Ingresar usando ssh desde nuestra maquina a la maquiana remota usando ip de  la maquina remota 
cd deploy/ : en deploy tenemos la llave privada 
ssh root@143.110.159.166 -i ssh/deploy    : connect to virtual machine nube


---------NOTA : no me funciono como tengo generada clave ssh en platziverse - he copiado la carpeta de clave publica y privada : y la clone aqui asi pude connectar .

--- desplegue----- hemos creado maquinna en centOs v8X64
  --- actualizar la maquina
      yum update (tarda de 2 a 5 minutos )
 --- instalacion de nodejs en  maquina : centOs version 8 x64 
      yum update   : reviso si la maquina ha sido actualizada 
    --- instalacion de paquetes adicionales donde se encuuentra nodejs :
     sudo yum install epel-release
    -- una vez instalados paquete adicionales procedemos instalar nodejs
    sudo yum install nodejs   (ya tenemos instalado nodejs en nuestra maquina )
    node -v 
    -- instalacion que voy a necesitar
    sudo yum install nano : un editor de codigo en consola
    sudo yum install git  : git para tarer codigo de la app  
    --- instalacion de pm2 usando npm 
    sudo npm install -g pm2 




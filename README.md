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
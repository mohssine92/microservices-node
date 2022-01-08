
// va ser la db que queremos setear a nuestro controlador del componente 

//  --db  false
// const store = require('../../../store/dummy'); 

// -- cuando no rabajo db como microservicio , cuando la db forma parte del api 
//const store = require('../../../store/mysql'); 

// en este caso Estamos en nuestro servicio Api haciendo peticion http Al microervicio de Mysql que esta Resolviendo los datos , y devolviendonos Resultado a Nuestro Api 
// porque estamos usando archivo remote-mysql el que toma la decicion que la peticion sera a tal api mysql - 
// asi podemos Tener varios archivos que configuran varias apis como postgresql - mongodb - bigquery etc .... 
// Nuestra Api no sabe cual es la base de datos que hay detras cual es queries , cual es syntaxis , Todo eso no problema de Nuestra api sino parte de nuestro micro servicio de datos .
// en caso de futuro tendremos problemas con conexiones podemos Replicar el micro servicio de datos , Tener varios micro servicios de Mysql .
// De esta forma podemos acceder a Nuestro datos atraves de un microServicio creando las funciones necesarias dentro de nuestro archivo de acceso Remoto.js
const store = require('../../../store/remote-mysql');


const ctrl = require('./controller');

// ctrl : es objeto --> strl() : convertido en una funcion  / asi archivo de controller debe exportar funcion  - le injectamos lo que queremos injectar en este caso sera store
module.exports = ctrl(store);











// controlador que esta accediendo a la parte de datos no requiera que automaticamenta una x db sea su db , muy util para parte de Testing connect to db teste o diferent db 
// lo hacemos de esta manera , este archivo exporta todos nuestros controller y le injectamos db 
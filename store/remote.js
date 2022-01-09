// request paquete nos va permitir hacer peticion http mucho mas sensilas -- Peticion a db Api -- generico a cualquier db presenatada como Api 
const error = require('../utils/error');
const axios = require('axios')
const chalk = require('chalk')

const config = require('../config.js');
function createRemoteDB(host, port) {

    const URL = 'http://'+ host + ':' + port; 
  

    function list(table) {
        return req('GET', table);
    } //ok

    function get(table, id) {
		return reqWithId('GET', table, id);
	} // ok

    function insert(table, data) {
		return req('POST', table, data);
	} //ok

	function update(table, data) {
		return req('PUT', table, data);
	} //ok

    function query(table, query ){
       
      return reqWithquery(table, query)
    }

	async function upsert(table, data) {


        // como en tabla de post me da igual que el user tener de 0 a muchos posts asi si detecto la tabla post le mando directamente a insert 
        if(table === 'post'){

            console.log('insert');
            return insert(table, data);   

        }

      
        let row = []
        let Row;
        if(data.id){
          row = await get(table, data.id) 
          Row = row.body
          console.log(`${chalk.bgCyan('[remote.js-40]- upsert')}`,Row );
         }

        if (Row.length === 0 ) { 
            console.log('insert');
            return insert(table, data);   
        } else {
            console.log('update');
            return update(table, data); // ok
        }
       
    }

    async function follow (table, data) {

        let row = []
        // consulta formada por dos llaves foeanes - llave compuesta 
        row = await reqfollow(table,data);
         
        if(row.length === 0){
            return insert(table, data); 
        }else{
            //TODO: si existe : disparamos un Unfollow delete
            console.log(`${chalk.bgCyan('[remote.js-40]- F:follow')}`, 'debemos unfollow'  );
        }
        
    }
	
    async function req(method, table, data) {

         
        let url = URL + '/' + table;
        console.log(`${chalk.bgCyan('[remote.js- F:req]')}`,method, table);
        console.log(`${chalk.bgCyan('[remote.js - F:req]')}`,url); 
       
        const body = data;
        const apiToken = config.apiToken;
            
       
        try {

       
            if(method === 'GET'){
              
                const res = await axios.get(url,{headers: {'apiToken': `${apiToken}`}} ); 
                return res.data.body; 
                
                
            }else if (method === 'PUT' && body instanceof Object ){
              
                await axios.put(url, body , {headers: {'apiToken': `${apiToken}`}});
                return 'Updated'; 

            }else if(method === 'POST' && body instanceof Object ){
           
               await axios.post(url, body , {headers: {'apiToken': `${apiToken}`}});
               return 'Inserted';
                
            }
         
              
        } catch (e) {
           
              // lo que asegura tener respuesta de api de err - error perzonalizado 
            
              throw error('Error en la Peticion hacia API de db Mysql', 400);
        }
      
    } //ok

    async function reqfollow(tabla, data){

   
        let result;
        const apiToken = config.apiToken;

        const instance = axios.create({
          baseURL: URL,
         // timeout: 1000,
          headers: {'apiToken': `${apiToken}`},
          params: {
            'tabla': `${tabla}`,
            'user_from': `${data.user_from}`,
            'user_to':  `${data.user_to}`

          }
        

        });

        try {

            const  { data } = await instance.get();
            result = data
              
        } catch (e) {
            throw error('Error en la Peticion hacia API de db Mysql', 400); 
        }
       
        return result.body;
    }

    async function reqWithId(method, table, id ) {
       
        let url = URL + '/' + table + '/' + id;
        const apiToken = config.apiToken;
        const res = await axios.get(url,{headers: {'apiToken': `${apiToken}`}}); 
       
        return res.data; 
        

    } // ok

    async function reqWithquery(table, query ){
       
        let url = URL + '/query';
        const apiToken = config.apiToken;
       

         const body = {} 
         body.q = query
         body.table = table;

        
         try {

            if( body instanceof Object ){
                const res = await axios.post(url, body ,{headers: {'apiToken': `${apiToken}`}}); //apiToken
                //console.log('[respuesta]', res.data.body);
                return res.data.body;
            }
             
         } catch (err) {
           
            throw error('Error en la Peticion hacia API de db Mysql', 400);
             
         }


    }

    async function join (tabla, query , join) {
    //    console.log(tabla);
    //    console.log(query);
    //    console.log(join);
           
       let url = URL + '/following';
       const apiToken = config.apiToken;


       const body = {} 
       body.table = tabla
       body.query = query;
       body.join = join;

       try {

        if( body instanceof Object ){
            const res = await axios.post(url, body ,{headers: {'apiToken': `${apiToken}`}}); //apiToken
            //console.log('[respuesta]', res.data.body);
            return res.data.body;
        }
         
      } catch (err) {
       
         throw error('Error en la Peticion hacia API de db Mysql', 400);
         
      }

    }


    return {
        list,
        get,
        upsert,
        query,
        follow,
        join
    }
}

module.exports = createRemoteDB;
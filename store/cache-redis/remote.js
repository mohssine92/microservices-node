const error = require('../../utils/error');
const axios = require('axios')
const chalk = require('chalk')

const config = require('../../config.js');


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



	async function upsert(table, data) {
        return insert(table, data);     
    }

 
	
    async function req(method, table, data) {

         
        let url = URL + '/' + table;
        console.log(`${chalk.bgCyan('[cache-redis/remote.js- F:req]')}`,method, table);
        console.log(`${chalk.bgCyan('[cache-redis/remote.js - F:req]')}`,url); 
       
        const body = data;
        const apiToken = config.apiToken;
            
       
        try {

       
            if(method === 'GET'){

               
                const res = await axios.get(url,{headers: {'apiToken': `${apiToken}`}} ); 
                return res.data.body; 
                
                
            }else if (method === 'PUT' && body instanceof Object ){ // todavia no uso 
              
                await axios.put(url, body , {headers: {'apiToken': `${apiToken}`}});
                return 'Updated'; 

            }else if(method === 'POST'){
           
               const res = await axios.post(url, body , {headers: {'apiToken': `${apiToken}`}});
               //console.log(res.data.body);

             
                
            }
         
              
        } catch (e) {
           
              // lo que asegura tener respuesta de api de err - error perzonalizado 
            
              throw error('Error en la Peticion hacia API de db Mysql', 400);
        }
      
    } //ok





    return {
        list,
        get,
        upsert,
       
    }
}

module.exports = createRemoteDB;
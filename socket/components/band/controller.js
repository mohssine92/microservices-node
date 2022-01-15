

const TABLA = 'user';

module.exports = function (injectedStore) {

    let store = injectedStore;
   
    if (!store) {
        store = require('../../../store/remote-mysql');
    }

    

    
    async function list() {
        const users = "Todo es ok";
        
        return users;


    } 

    

    

   

    return {
        list,
       
    }; 

}


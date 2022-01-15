const Band = require("./band");


class Bands {

    constructor() {
        this.bands = [];
    }

    addBand( band = new Band() ) { // muy parecido a tipado 
        this.bands.push( band );
    }

    getBands() {
        return this.bands;
    }

    deleteBand( id = '' ) {
        this.bands = this.bands.filter( band => band.id !== id );
        return this.bands;
    }

    voteBand( id = '' ) {

        this.bands = this.bands.map( band => {

            if ( band.id === id ) {
                // es incrementar en uno 
                band.votes++;
                return band;
            } else {
                return band;
            }

        });

    }

}


// Esta clase usada para manejar Bands en memoria luego sera sustituida por un controller de funciones 
// que comunicara con db file o db remota .
module.exports = Bands;

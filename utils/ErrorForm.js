

class ErroFrom extends Error {
    constructor (message , state ){
        super(message);
        this.state = state;
        this.isError = state ? "field" : "error";
    }
}



module.exports = ErroFrom;
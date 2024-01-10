const color = require('colors')



function ErrorRoute (err , req, res, next) {
    let ObjError  = {};
    if ( process.env.NODE_ENV == "development" ){
        ObjError.stack = err.stack  ;
        ObjError.state = err.state ;
        ObjError.err = err.message ;
    }
    if( process.env.NODE_ENV == "production" ){
        ObjError.message = err.message ;
        ObjError.state = err.state ;
    }


    return res.status(err.state || 500 ).json(ObjError); 
}


module.exports = ErrorRoute;
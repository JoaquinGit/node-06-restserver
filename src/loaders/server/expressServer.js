const express = require('express');
const morgan = require('morgan');
const config = require('../../config')

class ExpressServer {

    constructor() {

        this.app = express();
        this.port = config.port;
        this.basePathUser = `${ config.api.prefix }/users`;

        this._middlewares();
        this._routes();
    }

    // hace que express funcione con comunicación de content-type JSON
    _middlewares() {
        this.app.use(express.json());

        // loguea los request
        this.app.use(morgan('tiny'));
    }

    _routes() {

        // ruta de request para que el sector de infraestructura de la empresa monitoree en todo momento que esté funcionando la app
        this.app.head("/status", (req, res) => {
            res.status(200).end();
        });


        this.app.use( this.basePathUser, require('../../routes/users') );
    }

    async start () {

        this.app.listen(this.port, (error) => {

            if( error ) {
                console.log( error );
                process.exit( 1 );
                return;
            }
        });
    }
}

module.exports = ExpressServer;
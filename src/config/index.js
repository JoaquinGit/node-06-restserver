const dotenv = require('dotenv');

const envFound = dotenv.config();

if( !envFound ) {
    throw new Error("Could not find .env file.");
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


// App properties
module.exports = {
    port: process.env.PORT,
    api: {
        prefix: '/api/v1'
    }
}
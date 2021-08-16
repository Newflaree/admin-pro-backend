// Dotenv
require( 'dotenv' ).config();

// Models
const Server = require( './models/server.model' );

const server = new Server();
server.listen();

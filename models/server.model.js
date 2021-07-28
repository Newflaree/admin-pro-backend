require( 'colors' );
const express = require( 'express' );
const cors = require( 'cors' );


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.apiPaths = {
      users: '/api/users'
    }

    //TODO: Db connect
    
    // Methods
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // Cors
    this.app.use( cors() );

    // Parse json
    this.app.use( express.json() );

    // Public forder
    this.app.use( express.static( 'public' ) );
  }

  routes() {
    this.app.use( this.apiPaths.users, require( '../routes/users.route' ) );
  }

  listen() {
    this.app.listen( this.port, () => {
      console.clear();
      console.log( `Listening on port ${ this.port }`.black.bgWhite );
    });
  }
}


// Exports
module.exports = Server;

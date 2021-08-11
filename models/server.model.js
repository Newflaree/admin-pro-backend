require( 'colors' );
const express = require( 'express' );
const cors = require( 'cors' );

// Database
const { dbConnection } = require('../database/config.db');


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.apiPaths = {
      auth: '/api/auth',
      doctors: '/api/doctors',
      hospitals: '/api/hospitals',
      searches: '/api/searches',
      uploads: '/api/uploads',
      users: '/api/users'
    }
 
    this.connectDB();
    
    // Methods
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
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
    this.app.use( this.apiPaths.auth,      require( '../routes/auth.route' ) );
    this.app.use( this.apiPaths.doctors,   require( '../routes/doctors.route' ) );
    this.app.use( this.apiPaths.hospitals, require( '../routes/hospitals.route' ) );
    this.app.use( this.apiPaths.searches,  require( '../routes/searches.route' ) );
    this.app.use( this.apiPaths.uploads,   require( '../routes/uploads.route' ) );
    this.app.use( this.apiPaths.users,     require( '../routes/users.route' ) );
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

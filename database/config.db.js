require( 'colors' );
const mongoose = require( 'mongoose' );


// Connect to MongoDB
const dbConnection = async() => {
  try {
    await mongoose.connect( process.env.MONGO_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    console.log( 'Database ONLINE'.green );
  } catch ( err ) {
    console.log( err );
    throw new Error( 'Could not connect to the database'.red );
  }
}


// Exports
module.exports = {
  dbConnection
}

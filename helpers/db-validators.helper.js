// Models
const User = require( '../models/user.model' );


// Users
const userValidation = async( id = '' ) => {
  const idExists = await User.findById( id );
  if ( !idExists ) {
    throw new Error( 'There is no user with that ID' );
  }
  return true;
}

const emailValidation = async( email = '' ) => {
  const emailExists = await User.findOne({ email });
  if ( emailExists ) {
    throw new Error( 'There is already a user with that email' );
  }
  return true;
}


// Exports
module.exports = {
  emailValidation,
  userValidation
}

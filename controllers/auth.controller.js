// Express
const { request, response } = require( 'express' );
// Bcrypt
const bcrypt = require( 'bcryptjs' );

// Helpers
const { generateJWT } = require( '../helpers/generate-jwt.helper' );
// Models
const User = require( '../models/user.model' );


const login = async( req = request, res = response ) => {
  const { email, password } = req.body; 

  try {
    // Check if email exists
    const user = await User.findOne({ email });
    if ( !user ) {
      return res.status( 401 ).json({
        ok: false,
        msg: 'Incorrect email or password'
      });
    }
    
    // Check if the user is active
    if ( !user.status ) {
      return res.status( 401 ).json({
        ok: false,
        msg: 'Incorrect email or password'
      });
    }
    
    // Check password
    const validPassword = bcrypt.compareSync( password, user.password );
    if ( !validPassword ) {
      return res.status( 401 ).json({
        ok: false,
        msg: 'Incorrect email or password'
      });
    }

    // Generate JWT
    const token = await generateJWT( user.id );

    res.json({
      ok: true,
      user,
      token
    });

  } catch ( err ) {
    console.log( err );
    return res.status( 500 ).json({
      ok: false,
      msg: 'Something went wrong. Talk to the Administrator'
    });
  }
}


// Exports
module.exports = {
  login
}

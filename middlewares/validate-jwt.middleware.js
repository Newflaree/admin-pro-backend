const { request, response } = require( 'express' );
const jwt = require( 'jsonwebtoken' );

// Models
const User = require( '../models/user.model' );


const validateJWT = async( req = request, res = response, next ) => {
  const token = req.header( 'x-token' );
  if ( !token ) {
    return res.status( 401 ).json({
      ok: false,
      msg: 'There is no token in the request'
    });
  }

  try {
    const { uid } = jwt.verify( token, process.env.SECRET_KEY );
    const user = await User.findById( uid );

    if ( !user ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'Invalid token'
      });
    }

    if ( !user.status ) {
      return res.status( 400 ).json({
        ok: false,
        msg: 'Invalid token'
      });
    }

    req.user = user;
    req.uid = uid;
    next();

  } catch ( err ) {
    console.log( err );
    return res.status( 401 ).json({
      ok: false,
        msg: 'Invalid token'
    });
  }
}


// Exports
module.exports = {
  validateJWT
}

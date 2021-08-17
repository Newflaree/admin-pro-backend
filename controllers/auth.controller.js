// Express
const { request, response } = require( 'express' );
// Bcrypt
const bcrypt = require( 'bcryptjs' );

// Helpers
const { generateJWT, googleVerify } = require( '../helpers' );
// Models
const { User } = require( '../models' );


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

const googleSignIn = async( req = request, res = response ) => {
  const { id_token } = req.body;

  try {
    const { email, name, img } = await googleVerify( id_token );

    let user = await User.findOne({ email });
    if ( !user ) {
      const data = {
        email,
        name,
        img,
        password: '@@@@@@',
        google: true
      };
      
      user = new User( data );
    } else {
      user.google = true;
      user.password = '@@@@@@';
    }

    await user.save();

    if ( !user.status ) {
      return res.staus( 401 ).json({
        ok: false,
        msg: 'Talk to the administrator, user blocked'
      });
    }

    const token = await generateJWT( user.id );

    res.json({
      ok: true,
      user,
      token
    });

  } catch( err ) {
    console.log( err );
    res.status( 400 ).json({
      ok: false,
      msg: 'Google token is not valid'
    });
  }
}

const renewToken = async( req = request, res = response ) => {
  const uid = req.uid;
  const token = await generateJWT( uid );

  res.json({
    ok: true,
    token
  });
}


// Exports
module.exports = {
  googleSignIn,
  login,
  renewToken
}

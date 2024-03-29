// Google
const { OAuth2Client } = require( 'google-auth-library' );


const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

const googleVerify = async( id_token ) => {
  const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { 
    name, 
    picture: img, 
    email 
  } = ticket.getPayload();

  return { name, img, email };
}


// Exports
module.exports = {
  googleVerify
}

// Express
const { request, response } = require( 'express' );



const fileUpload = async( req = request, res = response ) => {
  const { collection, id } = req.params;
  
  const collectionsAllowed = [
    'doctors',
    'hospitals',
    'users',
  ];
  // Validate collecion
  if ( !collectionsAllowed.includes( collecion ) ) {
    return res.status( 400 ).json({
      ok: false,
      msg: 'The collecion is not allowed'
    });
  }



  res.json({
    collection,
    id
  });
}


// Exports
module.exports = {
  fileUpload
}




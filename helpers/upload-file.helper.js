const path = require( 'path' );
const { v4: uuidv4 } = require( 'uuid' );


const uploadFile = ( files, allowedExtensions = [ 'jpg', 'png', 'jpeg', 'gif' ], folder = '' ) => {
  return new Promise( ( resolve, reject ) => {
    const { file } = files;
    const cutName = file.name.split( '.' );
    const extension = cutName[ cutName.length -1 ];

    if ( !allowedExtensions.includes( extension ) ) {
      return reject( `The ${ extension } extension is not allowed` );
    }

    const tempName = uuidv4() + '.' + extension;
    const uploadPath = path.join( __dirname, '../uploads/', folder, tempName );

    file.mv( uploadPath, ( err ) => {
      if ( err ) {
        return reject( err );
      }

      resolve( tempName );
    });
  }); 
}


// Exports
module.exports = {
  uploadFile
}

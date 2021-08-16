// NodeJS
const fs = require( 'fs' );
const path = require( 'path' );

// Express
const { request, response } = require( 'express' );
// Cloudinary
const cloudinary = require( 'cloudinary' ).v2;
cloudinary.config( process.env.CLOUDINARY_URL );

// Helpers
const { uploadFile } = require( '../helpers' );
// Models
const { User, Doctor, Hospital } = require( '../models' );


// End Points
const uploadCloudinaryImage = async( req = request, res = response ) => {
  const { id, collection } = req.params;

  let model;

  switch ( collection ) {
    case 'doctors':
      model = await Doctor.findById( id );
      if ( !model ) {
        return res.status( 400 ).json({
          ok: false,
          msg: 'There is no doctor with that id'
        });
      }
    break;

    case 'hospitals':
      model = await Hospital.findById( id );
      if ( !model ) {
        return res.status( 400 ).json({
          ok: false,
          msg: 'There is no hospital with that id'
        });
      }
    break;

    case 'users':
      model = await User.findById( id );
      if ( !model ) {
        return res.status( 400 ).json({
          ok: false,
          msg: 'There is no user with that id'
        });
      }
    break;

    default:
      return res.status( 500 ).json({
        ok: false,
        msg: 'This end point is not yet validated'
      });
  }

  if ( model.img ) {
    const cutName = model.img.split( '/' );
    const name = cutName[ cutName.length -1 ];
    const [ public_id ] = name.split( '.' );
    await cloudinary.uploader.destroy( public_id );
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
  model.img = secure_url;
  await model.save();

  res.json({
    ok: true,
    model
  });

}

const showImega = async( req = request, res = response ) => {
  const { id, collection } = req.params;

  let model;

  switch ( collection ) {
    case 'doctors':
      model = await Doctor.findById( id );
      if ( !model ) {
        return res.status( 400 ).json({
          ok: false,
          msg: 'There is no doctor with that ID'
        });
      }
    break;

    case 'hospitals':
      model = await Hospital.findById( id );
      if ( !model ) {
        return res.status( 400 ).json({
          ok: false,
          msg: 'There is no doctor with that ID'
        });
      }
    break;

    case 'users':
      model = await User.findById( id );
      if ( !model ) {
        return res.status( 400 ).json({
          ok: false,
          msg: 'There is no doctor with that ID'
        });
      }
    break;

    default:
      return res.status( 500 ).json({
        ok: false,
        msg: 'This end point is not yet validated'
      });
  }

  if ( model.img ) {
    const imagePath = path.join( __dirname, '../uploads', collection, model.img );
    if( fs.existsSync( imagePath ) ) {
      return res.sendFile( imagePath )
    }
  }

  const imagePath = path.join( __dirname, '../assets/no-image.jpg' );
  res.sendFile( imagePath );
}


// Exports
module.exports = {
  uploadCloudinaryImage,
  showImega
}




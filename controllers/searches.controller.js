// Express
const { request, response } = require( 'express' );
// Mongoose
const { ObjectId } = require( 'mongoose' ).Types;

// Models
const { 
  Doctor,
  Hospital, 
  User, 
} = require( '../models' );


const totalSearch = async( req = request, res = response ) => {
  const { search } = req.params; 
  const regexp = new RegExp( search, 'i' );

  const [ doctors, hospitals, users ] = await Promise.all([
    Doctor.find({ name: regexp }),
    Hospital.find({ name: regexp }),
    User.find({ name: regexp }),
  ]);

  res.json({
    ok: true,
    doctors,
    hospitals,
    users,
  });
}

const specificSearch = async( req = request, res = response ) => {
  const { collection, search } = req.params;
  const regexp = new RegExp( search, 'i' );
  let data = [];

  switch ( collection ) {
    case 'doctors':
      data = await Doctor.find({ name: regexp })
        .populate( 'user', 'name img' )
        .populate( 'hospital', 'name img' );
    break;

    case 'hospitals':
      data = await Hospital.find({ name: regexp })
        .populate( 'user', 'name img' );
    break;

    case 'users':
      data = await User.find({ name: regexp })
    break;

    default:
      return res.status( 400 ).json({
        ok: false,
        msg: 'Collection not found'
      });
  }

  res.json({
    ok: true,
    collection,
    results: data
  });
}


// Exports
module.exports = {
  specificSearch,
  totalSearch
}


// Express
const { request, response } = require( 'express' );
// bcryptjs
const bcrypt = require( 'bcryptjs' );

// Helpers
// 
// Models
const { Hospital } = require( '../models' );


const getHospitals = async( req = request, res = response ) => {
  const { limit = 5, from = 0 } = req.query
  const query = { status: true };

  const [ total, hospitals ] = await Promise.all([
    Hospital.countDocuments( query ),
    Hospital.find( query )
      .populate( 'user', 'name' )
      .skip( Number( from ) )
      .limit( Number( limit ) ),
  ]);

  res.json({
    ok: true,
    total,
    hospitals
  });
}

const getHospital = async( req = request, res = response ) => {
  const { id } = req.params;

  // Find Hospital
  const hospital = await Hospital.findById( id );

  // Verify hospital status
  if ( !hospital.status ) {
    return res.status( 400 ).json({
      ok: false,
      msg: 'There is no hospital with that ID'
    });
  }

  res.json({
    ok: true,
    hospital
  });
}

const createHospital = async( req = request, res = response ) => {
  const name = req.body.name.toUpperCase();

  const data = {
    name,
    user: req.user._id
  }

  const hospital = new Hospital( data );
  await hospital.save();

  res.status( 201 ).json({
    ok: true,
    hospital
  });
}

const updateHospital = async( req = request, res = response ) => {
  const { id } = req.params;
  const { img, status, _id, ...rest } = req.body;
  rest.name = rest.name.toUpperCase();

  const hospital = await Hospital.findByIdAndUpdate( id, rest, { new: true } );

  res.json({
    ok: true,
    hospital
  });
}

const deleteHospital = async( req = request, res = response ) => {
  res.json({
    msg: 'delete - H'
  });
}


// Exports
module.exports = {
  getHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital
}

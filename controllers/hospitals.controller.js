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
  res.json({
    msg: 'get - H'
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
  res.json({
    msg: 'put - H'
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

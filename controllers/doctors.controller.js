// Express
const { request, response } = require( 'express' );
// bcryptjs
const bcrypt = require( 'bcryptjs' );

// Helpers
// 
// Models
const { Doctor, Hospital } = require( '../models' );


const getDoctors = async( req = request, res = response ) => {
  const { limit = 5, from = 0 } = req.query
  const query = { status: true };

  const [ total, doctors ] = await Promise.all([
    Doctor.countDocuments( query ),
    Doctor.find( query )
      .populate( 'user', 'name' )
      .populate( 'hospital', 'name' )
      .skip( Number( from ) )
      .limit( Number( limit ) ),
  ]);

  res.json({
    ok: true,
    total,
    doctors
  });
}

const getDoctor = async( req = request, res = response ) => {
  res.json({
    msg: 'get - D'
  });
}

const createDoctor = async( req = request, res = response ) => {
  const { name, hospital } = req.body;
  const uid = req.uid;

  const data = {
    name,
    user: uid,
    hospital
  }

  const doctor = new Doctor( data );
  await doctor.save();
   
  res.json({
    ok: true,
    doctor
  });
}

const updateDoctor = async( req = request, res = response ) => {
  res.json({
    msg: 'put - D'
  });
}

const deleteDoctor = async( req = request, res = response ) => {
  res.json({
    msg: 'delete - D'
  });
}


// Exports
module.exports = {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor
}

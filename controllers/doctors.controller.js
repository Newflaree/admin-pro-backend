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
  const { id } = req.params;

  // Find Hospital
  const doctor = await Doctor.findById( id );

  // Verify user status
  if ( !doctor.status ) {
    return res.status( 400 ).json({
      ok: false,
      msg: 'There is no hospital with that ID'
    });
  }

  res.json({
    ok: true,
    doctor
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
  const { id } = req.params;
  const { _id, img, status, ...rest } = req.body;

  let doctor = await Doctor.findById( id );
  if ( !doctor.status ) {
    return res.status( 400 ).json({
      ok: false,
      msg: 'There is no doctor with that ID'
    });
  }

  doctor = await Doctor.findByIdAndUpdate( id, rest, { new: true } );

  res.json({
    ok: true,
    doctor,
    user: req.uid
  });

}

const deleteDoctor = async( req = request, res = response ) => {
  const { id } = req.params;

  let doctor = await Doctor.findById( id );
  if ( !doctor.status ) {
    return res.status( 400 ).json({
      ok: false,
      msg: 'There is no doctor with that ID'
    });
  }

  doctor = await Doctor.findByIdAndUpdate( id, { status: false }, { new: true } );

  res.json({
    ok: true,
    doctor
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

// Models
const User = require( '../models/user.model' );
const Hospital = require( '../models/hospital.model' );
const Doctor = require( '../models/doctor.model' );


// Users
const userIdValidation = async( id = '' ) => {
  const idExists = await User.findById( id );
  if ( !idExists ) {
    throw new Error( 'There is no user with that ID' );
  }
  return true;
}

const emailValidation = async( email = '' ) => {
  const emailExists = await User.findOne({ email });
  if ( emailExists ) {
    throw new Error( 'There is already a user with that email' );
  }
  return true;
}

// Hospitals
const hospitalValidation = async( name = '' ) => {
  const nameCap = name.toUpperCase();
  const hospitalExists = await Hospital.findOne({ name: nameCap });
  if ( hospitalExists ) {
    throw new Error( 'There is already a hospital with that name' );
  }
  return true;
}

const hospitalIdValidation = async( id = '' ) => {
  const hospitalExists = await Hospital.findById( id );
  if ( !hospitalExists ) {
    throw new Error( 'There is no hospital with that ID' );
  }
  return true;
}

// Doctors
const doctorValidation = async( name = '' ) => {
  const nameCap = name.toUpperCase();
  const doctorExists = await Doctor.findOne({ name: nameCap });
  if ( doctorExists ) {
    throw new Error( 'There is already a doctor with that name' );
  }
  return true;
}

const doctorIdValidation = async( id = '' ) => {
  const doctorExists = await Doctor.findById( id );
  if ( !doctorExists ) {
    throw new Error( 'There is no doctor with that ID' );
  }
  return true;
}


// Exports
module.exports = {
  emailValidation,
  userIdValidation,

  hospitalIdValidation,
  hospitalValidation,

  doctorIdValidation
}

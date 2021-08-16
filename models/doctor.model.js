const { Schema, model } = require( 'mongoose' );


const DoctorSchema = Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  hospital: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
  },
  status: {
    type: Boolean,
    default: true
  },
});

DoctorSchema.methods.toJSON = function() {
  const { __v, ...object } = this.toObject();
  return object;
}


// Exports
module.exports = model( 'Doctor', DoctorSchema );

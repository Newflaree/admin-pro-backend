const { Schema, model } = require( 'mongoose' );


const HospitalSchema = Schema({
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
  status: {
    type: Boolean,
    default: true
  },
}/*, { collection: 'hospitales' } */);

HospitalSchema.methods.toJSON = function() {
  const { __v, ...object } = this.toObject();
  return object;
}


// Exports
module.exports = model( 'Hospital', HospitalSchema );

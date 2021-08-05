// Express
const { request, response } = require( 'express' );
// bcryptjs
const bcrypt = require( 'bcryptjs' );

// Model
const User = require( '../models/user.model' );


const getUsers = async( req = request, res = response ) => {
  const users = await User.find( {}, 'name email role google status' );

  res.json({
    ok: true,
    users
  });
}

const getUser = ( req = request, res = response ) => {
  res.json({
    msg: 'Hello from controller - get:id'
  });
}

const createUser = async( req = request, res = response ) => {
  const { email, name, password } = req.body;
  const user = new User({ email, name, password });

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync( password, salt );

  await user.save();

  res.status( 201 ).json({
    ok: true,
    user
  });

}

const updateUser = async( req = request, res = response ) => {
  const { id } = req.params;
  const { _id, password, google, status, email, ...rest } = req.body;

  if ( password ) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync( password, salt );
  }

  const user = await User.findByIdAndUpdate( id, rest, { new: true } );

  res.json({
    ok: true,
    user
  });
}

const deleteUser = async( req = request, res = response ) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate( id, { status: false }, { new: true } );

  res.json({
    ok: true,
    user
  });
}


// Exports
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}

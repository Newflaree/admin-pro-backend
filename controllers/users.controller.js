// Express
const { request, response } = require( 'express' );
// bcryptjs
const bcrypt = require( 'bcryptjs' );

// Helpers
const { generateJWT } = require( '../helpers' );
// Models
const { User } = require( '../models' );


const getUsers = async( req = request, res = response ) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [ total, users ] = await Promise.all([
    User.countDocuments( query ),
    User.find( query )
      .skip( Number( from ) )
      .limit( Number( limit ) )
  ]);

  res.json({
    ok: true,
    total,
    users,
    uid: req.uid
  });
}

const getUser = async( req = request, res = response ) => {
  const { id } = req.params;

  // Find User
  const user = await User.findById( id );

  // Verify user status
  if ( !user.status ) {
    return res.status( 400 ).json({
      ok: false,
      msg: 'There is no user with that ID'
    });
  }

  res.json({
    ok: true,
    user
  });
}

const createUser = async( req = request, res = response ) => {
  const { email, name, password } = req.body;

  // Create a new user
  const user = new User({ email, name, password });

  // Encrypt password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync( password, salt );

  // Save to DB
  await user.save();

  // Generate JWT
  const token = await generateJWT( user.id );

  res.status( 201 ).json({
    ok: true,
    user,
    token
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

// Express
const { request, response } = require( 'express' );

// Model
const User = require( '../models/user.model' );


const getUsers = async( req = request, res = response ) => {
  const users = await User.find( {}, 'name email role google status' );

  res.json({
    users
  });
}

const getUser = ( req = request, res = response ) => {
  res.json({
    msg: 'Hello from controller - get:id'
  });
}

const createUser = async( req = request, res = response ) => {
  const { name, password, email } = req.body;  
  
  try {
    const userExists = await User.findOne({ email });

    if ( userExists ) {
      return res.status( 500 ).json({
        ok: false,
        msg: 'There is already a user with that email'
      });
    }

    const user = new User( req.body );
    await user.save();

    res.json({
      user
    });

  } catch ( err ) {
    console.log( err );
    res.status( 500 ).json({
      ok: false,
      msg: 'Unexpected error'
    });
  }
}

const updateUser = ( req = request, res = response ) => {
  res.json({
    msg: 'Hello from controller - update'
  });
}

const deleteUser = ( req = request, res = response ) => {
  res.json({
    msg: 'Hello from controller - delete'
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

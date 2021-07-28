// Express
const { request, response } = require( 'express' );


const getUsers = ( req = request, res = response ) => {
  res.json({
    msg: 'Hello from controller - get'
  });
}

const getUser = ( req = request, res = response ) => {
  res.json({
    msg: 'Hello from controller - get:id'
  });
}

const createUser = ( req = request, res = response ) => {
  res.json({
    msg: 'Hello from controller - post'
  });
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

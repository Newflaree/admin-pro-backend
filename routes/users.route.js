/*
 *  Route: /api/users
 */
// Express
const { Router } = require( 'express' );

// Controllers
const {  
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require( '../controllers/users.controller' );


const router = Router();

// End points
router.get( '/', getUsers );
router.get( '/:id', getUser );
router.post( '/', createUser );
router.put( '/:id', updateUser );
router.delete( '/:id', deleteUser );


// Exports
module.exports = router;

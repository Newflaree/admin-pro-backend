/*
 *  Route: /api/users
 */
// Express
const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

// Middlewares
const { validateFields } = require( '../middlewares/validate-fields.middleware' );

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

router.post( '/', [
  check( 'name', 'The name is mandatory' ).not().isEmpty(),
  check( 'password', 'The password is mandatory' ).not().isEmpty(),
  check( 'email', 'The email is mandatory' ).isEmail(),
  validateFields
], createUser );

router.put( '/:id', updateUser );

router.delete( '/:id', deleteUser );


// Exports
module.exports = router;

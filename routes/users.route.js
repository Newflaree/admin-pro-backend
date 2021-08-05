/*
 *  Route: /api/users
 */
// Express
const { Router } = require( 'express' );
// Express-validator
const { check } = require( 'express-validator' );

// Helpers
const { emailValidation, userValidation } = require( '../helpers/db-validators.helper' );
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
  check( 'password', 'Password must be longer than 6 characters' ).isLength({ min: 6 }),
  check( 'email', 'The email is mandatory' ).isEmail(),
  check( 'email' ).custom( emailValidation ),
  validateFields
], createUser );

router.put( '/:id', [
  check( 'id', 'Not a valid ID' ).isMongoId(),
  check( 'id' ).custom( userValidation ),
  check( 'name', 'The name is mandatory' ).not().isEmpty(),
  validateFields
], updateUser );

router.delete( '/:id', [
  check( 'id', 'Not a valid ID' ).isMongoId(),
  check( 'id' ).custom( userValidation ),
  validateFields
], deleteUser );


// Exports
module.exports = router;

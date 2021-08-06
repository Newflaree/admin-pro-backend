/*
 *  Route: /api/users
 */
// Express
const { Router } = require( 'express' );
// Express-validator
const { check } = require( 'express-validator' );

// Controllers
const {  
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require( '../controllers/users.controller' );
// Helpers
const { emailValidation, userIdValidation } = require( '../helpers/db-validators.helper' );
// Middlewares
const { validateFields } = require( '../middlewares/validate-fields.middleware' );
const { validateJWT } = require( '../middlewares/validate-jwt.middleware' );


const router = Router();

// End points
router.get( '/', validateJWT, getUsers );

router.get( '/:id', [
  check( 'id', 'Not a valid ID' ).isMongoId(),
  check( 'id' ).custom( userIdValidation ),
  validateFields
], getUser );

router.post( '/', [
  check( 'name', 'The name is mandatory' ).not().isEmpty(),
  check( 'password', 'Password must be longer than 6 characters' ).isLength({ min: 6 }),
  check( 'email', 'The email is mandatory' ).isEmail(),
  check( 'email' ).custom( emailValidation ),
  validateFields
], createUser );

router.put( '/:id', [
  validateJWT,
  check( 'id', 'Not a valid ID' ).isMongoId(),
  check( 'id' ).custom( userIdValidation ),
  check( 'name', 'The name is mandatory' ).not().isEmpty(),
  validateFields
], updateUser );

router.delete( '/:id', [
  validateJWT,
  check( 'id', 'Not a valid ID' ).isMongoId(),
  check( 'id' ).custom( userIdValidation ),
  validateFields
], deleteUser );


// Exports
module.exports = router;

/*
 *  Route: /api/auth
 */
// Express
const { Router } = require( 'express' );
// Express-validator
const { check } = require( 'express-validator' );

// Controllers
const { googleSignIn, login, renewToken } = require( '../controllers/auth.controller' );
// Helpers
const { emailValidation } = require( '../helpers' );
// Middlewares
const { validateFields, validateJWT } = require( '../middlewares' );


const router = Router();

// End points
router.post( '/login', [
  check( 'email', 'The email is mandatory' ).isEmail(),
  check( 'password', 'The password is mandatory' ).not().isEmpty(),
  validateFields
], login );

router.post( '/google', [
  check( 'id_token', 'The Google token is mandatory' ).not().isEmpty(),
  validateFields
], googleSignIn );

router.get( '/renew', [
  validateJWT,
  validateFields
], renewToken );


// Exports
module.exports = router;

/*
 *  Route: /api/auth
 */
// Express
const { Router } = require( 'express' );
// Express-validator
const { check } = require( 'express-validator' );

// Controllers
const { login } = require( '../controllers/auth.controller' );
// Helpers
const { emailValidation } = require( '../helpers/db-validators.helper' );
// Middlewares
const { validateFields } = require( '../middlewares/validate-fields.middleware' );


const router = Router();

// End points
router.post( '/login', [
  check( 'email', 'The email is mandatory' ).isEmail(),
  check( 'password', 'The password is mandatory' ).not().isEmpty(),
  validateFields
], login );


// Exports
module.exports = router;

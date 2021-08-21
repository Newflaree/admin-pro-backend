/*
 *  Route: /api/hospitals
 */
// Express
const { Router } = require( 'express' );
// Express-validator
const { check } = require( 'express-validator' );

// Controllers
const {
  createHospital,
  deleteHospital,
  getHospital,
  getHospitals,
  updateHospital,
} = require( '../controllers/hospitals.controller' );
// Helpers
const { hospitalValidation, hospitalIdValidation } = require( '../helpers' );
// Middlewares
const { 
  validateFields,
  validateJWT, 
} = require( '../middlewares' );


const router = Router();

// End points
router.get( '/', validateJWT, getHospitals );

router.get( '/:id', [
  validateJWT,
  check( 'id', 'Not a valid Mongo ID' ).isMongoId(),
  check( 'id' ).custom( hospitalIdValidation ),
  validateFields
], getHospital );

router.post( '/', [
  validateJWT,
  check( 'name', 'The hospital name is mandatory' ).not().isEmpty(),
  check( 'name' ).custom( hospitalValidation ),
  validateFields
], createHospital );

router.put( '/:id', [
  validateJWT,
  check( 'name', 'The hospital name is mandatory' ).not().isEmpty(),
  check( 'name' ).custom( hospitalValidation ),
  check( 'id', 'Not a valid Mongo ID' ).isMongoId(),
  check( 'id' ).custom( hospitalIdValidation ),
  validateFields
], updateHospital );

router.delete( '/:id', [
  validateJWT,
  check( 'id', 'Not a valid Mongo ID' ).isMongoId(),
  check( 'id' ).custom( hospitalIdValidation ),
  validateFields
], deleteHospital );


// Exports
module.exports = router;

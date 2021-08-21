/*
 *  Route: /api/doctors
 */
// Express
const { Router } = require( 'express' );
// Express-validator
const { check } = require( 'express-validator' );

// Controllers
const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor
} = require( '../controllers/doctors.controller' );
// Helpers
const { 
  doctorIdValidation,
  hospitalIdValidation
} = require( '../helpers' );
// Middlewares
const { 
  validateFields, 
  validateJWT 
} = require( '../middlewares' );


const router = Router();

// End points
router.get( '/', validateJWT, getDoctors );

router.get( '/:id', [
  validateJWT,
  check( 'id', 'Not a valid Mongo ID' ).isMongoId(),
  check( 'id' ).custom( doctorIdValidation ),
  validateFields
], getDoctor );

router.post( '/', [
  validateJWT,
  check( 'name', 'The doctor name is mandatory' ).not().isEmpty(),
  check( 'hospital', 'Not a valid ID' ).isMongoId(),
  check( 'hospital' ).custom( hospitalIdValidation ),
  validateFields
], createDoctor );

router.put( '/:id', [
  validateJWT,
  check( 'id', 'Not a valid Mongo ID' ).isMongoId(),
  check( 'id' ).custom( doctorIdValidation ),
  check( 'hospital', 'Not a valid ID' ).isMongoId(),
  check( 'hospital' ).custom( hospitalIdValidation ),
  validateFields
], updateDoctor );

router.delete( '/:id', [
  validateJWT,
  check( 'id', 'Not a valid Mongo ID' ).isMongoId(),
  check( 'id' ).custom( doctorIdValidation ),
  validateFields
], deleteDoctor );


// Exports
module.exports = router;

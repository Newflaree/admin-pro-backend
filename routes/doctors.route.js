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
  hospitalIdValidation, 
} = require( '../helpers' );
// Middlewares
const { 
  validateFields, 
  validateJWT 
} = require( '../middlewares' );


const router = Router();

// End points
router.get( '/', validateJWT, getDoctors );

router.get( '/:id', getDoctor );

router.post( '/', [
  validateJWT,
  check( 'name', 'The doctor name is mandatory' ).not().isEmpty(),
  check( 'hospital', 'Not a valid ID' ).isMongoId(),
  check( 'hospital' ).custom( hospitalIdValidation ),
  validateFields
], createDoctor );

router.put( '/:id', updateDoctor );

router.delete( '/:id', deleteDoctor );


// Exports
module.exports = router;

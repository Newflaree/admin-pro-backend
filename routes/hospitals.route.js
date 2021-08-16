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
const { hospitalValidation } = require( '../helpers' );
// Middlewares
const { 
  validateFields,
  validateJWT, 
} = require( '../middlewares' );


const router = Router();

// End points
router.get( '/', validateJWT, getHospitals );

router.get( '/:id', getHospital );

router.post( '/', [
  validateJWT,
  check( 'name', 'The hospital name is mandatory' ).not().isEmpty(),
  check( 'name' ).custom( hospitalValidation ),
  validateFields
], createHospital );

router.put( '/:id', updateHospital );

router.delete( '/:id', deleteHospital );


// Exports
module.exports = router;

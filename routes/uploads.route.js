/*
 *  Route: /api/uploads
 */
// Express
const { Router } = require( 'express' );
// Express-validator
const { check } = require( 'express-validator' );

// Controllers
const { 
  uploadCloudinaryImage, 
  showImega 
} = require( '../controllers/uploads.controller' );
// Middlewares
const { 
  validateFields, 
  validateFile,
  validateJWT, 
} = require( '../middlewares' );


const router = Router();

router.get( '/:collection/:id', [
  check( 'id', 'Not a valid ID' ).isMongoId(),
  validateFields
], showImega );

router.put( '/:collection/:id', [
  validateJWT,
  validateFile,
  check( 'id', 'Not a valid ID' ).isMongoId(),
  validateFields
], uploadCloudinaryImage );


// Exports
module.exports = router;

/*
 *  Route: /api/uploads
 */
// Express
const { Router } = require( 'express' );

// Controllers
const { fileUpload } = require( '../controllers/uploads.controller' );
//
// Middlewares
const { validateJWT, validateFields } = require( '../middlewares' );


const router = Router();

router.put( '/:collection/:id', [
  validateJWT,
  validateFields
], fileUpload );


// Exports
module.exports = router;

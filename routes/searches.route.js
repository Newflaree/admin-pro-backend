/*
 *  Route: /api/searches
 */
// Express
const { Router } = require( 'express' );

// Controllers
const { specificSearch, totalSearch } = require( '../controllers/searches.controller' );
// Middlewares
const { validateJWT } = require( '../middlewares' );


const router = Router();

router.get( '/:search', validateJWT, totalSearch );
router.get( '/:collection/:search', validateJWT, specificSearch );


// Exports
module.exports = router;

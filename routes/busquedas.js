/*
    Busqueda
    Route: api/todo/ 
*/


const { Router } = require( 'express' );
const { validarJWT } = require( '../middlewares/validar-jwt' );

const { getTodo, getDocumentos } = require( '../controllers/busquedas' );

const router = Router();

router.get( '/:busqueda', validarJWT, getTodo );

router.get( '/coleccion/:tabla/:busqueda', validarJWT, getDocumentos );

module.exports = router;

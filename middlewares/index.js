// Middlewares
const validateFields = require( './validate-fields.middleware' );
const validateJWT = require( './validate-jwt.middleware' );


// Exports
module.exports = {
  ...validateFields,
  ...validateJWT
}

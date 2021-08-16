// Middlewares
const validateFields = require( './validate-fields.middleware' );
const validateFile = require( './validate-file.middleware' );
const validateJWT = require( './validate-jwt.middleware' );


// Exports
module.exports = {
  ...validateFields,
  ...validateFile,
  ...validateJWT
}

const validateFields = require( './validate-fields.middleware' );
const validateJWT = require( './validate-jwt.middleware' );

module.exports = {
  validateFields,
  validateJWT
}

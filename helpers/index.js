const dbValidators = require('./db_validators')
const generateJWT = require('./generateJWT')
const verifyGoogle = require('./verify_google')
const uploadFile= require('./uploadfile')




module.exports = {
   ...dbValidators,
   ...generateJWT,
   ...verifyGoogle,
   ...uploadFile,
}
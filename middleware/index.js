const noFile = require('./notfile')
const userMiddlewrae = require('./user.middleware')
const validateJWt = require('./validateJWT')
const validateRols = require('./validate_rols')




module.exports  = {
...noFile,
...userMiddlewrae,
...validateJWt,
...validateRols,
}
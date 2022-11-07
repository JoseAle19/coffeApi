const { Router } = require('express')
const { readToken } = require('../controller/read_token')
const { validateJWT } = require('../middleware')

const router = Router()



router.post('/readToken', readToken)




module.exports = router




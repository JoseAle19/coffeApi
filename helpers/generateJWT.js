const jwt = require("jsonwebtoken");
const { Promise } = require("mongoose");



const generateToken = (uid) => {
    return new Promise ((resolve, reject) => {
        const payload = {
            uid
        }
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "24h"
        }, (err, token) => {
            if (err) {
                console.log("No se pudo generar el token " + err);
                reject("No se pudo generar el token")
            } else {
                resolve(token)
            }
        })
    })







}



module.exports = {
    generateToken
}
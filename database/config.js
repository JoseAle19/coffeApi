const mongoose = require('mongoose');
require("colors")


const dbconnection = async () => {

    try {
        await mongoose.connect(process.env.MONGO_DB)

        console.log("Database is connected".red);

    } catch (err) {
        throw new Error(`Error en la base de datos ${err}`)

    }
}


module.exports = {
    dbconnection
}
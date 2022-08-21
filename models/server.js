const epxress = require("express");
const cors = require("cors")
const morgan = require("morgan")
const { dbconnection } = require("../database/config")
class Server {
    array = [];

    constructor() {
        this.app = epxress();
        this.port = process.env.PORT;
        //middlewares
        this.middlewares();
        //Rutas de la aplicacion    
        this.routes();

        //Conectar ala base de datos

        this.connectdatabase();

    }


    async connectdatabase(){
await dbconnection();

    }

    middlewares() {

        this.app.use(cors());
        // this.app.use(morgan())
        
        this.app.use(epxress.static("public"))

        this.app.use(epxress.json())
    }


    routes() {

        this.app.use("/api/users", require("../routes/user.routes"))
    }
    listen() {
        this.app.listen(this.port, (err) => {

            if (err) {
                console.log(err);
            }
            console.log("Running in the " + this.port );
        })
    }
}






module.exports = Server;





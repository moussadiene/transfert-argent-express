const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3000;


class server {

    async start() {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
        this.initExpressMdlw();
        this.initRoutes();
    }

    initExpressMdlw() {
        app.use(cors())
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(morgan('dev'))
    }

    initRoutes() {
        app.get("/", (req, res) => {
            res.json({ message: "Welcome to je transfert d'argent system." });
        });
        const RouteTransfert = require('./app/routes/transfert.routes');
        new RouteTransfert(app);


    }
}

new server().start();
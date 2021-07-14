const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const dbConfig = require("./db.config");
class Singleton {

    static instanceDB;

    constructor() {
        this.getCompteInstance();
    }
    getCompteInstance() {

        const URL = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
        this.instanceDB = mongoose.createConnection(
            URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
        this.instanceDB.on("error", console.error.bind(console, "CompteDB Connection Error >> : "));
        this.instanceDB.once("open", function() {
            console.log("Successfully connect to " + dbConfig.DB + " !");
        });
    }

}

module.exports = new Singleton;
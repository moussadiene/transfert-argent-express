'use strict'
const conn = require('../configs/singleton.config');
class DB {
    static Emeteur;
    static Recepteur;
    static Transfert;

    constructor() {
        this.models();
    }

    models() {
        const mongoose = conn.instanceDB;
        this.Emeteur = mongoose.model("Emeteur", require("./emeteur.model"))
        this.Recepteur = mongoose.model("Recepteur", require("./recepteur.model"))
        this.Transfert = mongoose.model("Transfert", require("./transfert.model"))

    }
    removeModels() {
        this.Emeteur = null;
        this.Recepteur = null;
        this.Transfert = null;
    }
}
module.exports = new DB
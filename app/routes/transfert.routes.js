const TransfertController = require("../controllers/transfert.controller");

class RouteTransfert {
    url_base = "/transfert";
    constructor(app) {
        const transfert = new TransfertController();
        app.post(this.url_base + "/save", transfert.saveTransfert);
        app.get(this.url_base + "/all", transfert.AllTransferts);
    }
}
module.exports = RouteTransfert;
const TransfertController = require("../controllers/transfert.controller");

class RouteTransfert {
    url_base = "/transfert";
    constructor(app) {
        const transfert = new TransfertController();
        app.post(this.url_base, transfert.saveTransfert);
        app.get(this.url_base, transfert.AllTransferts);
    }
}
module.exports = RouteTransfert;
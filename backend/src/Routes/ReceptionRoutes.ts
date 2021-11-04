import {Application} from "express";

module.exports = function setReceptionRoutes(app: Application) {

    const receptionsController = require("../Controllers/ReceptionsController.ts");

    app.route("/api/receptions/:email")
        .get(receptionsController.listAllReceptions)

    app.route("/api/receptions/addReception")
        .post(receptionsController.addReception)

};
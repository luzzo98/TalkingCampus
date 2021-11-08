import {Application} from "express";

module.exports = function setReceptionRoutes(app: Application) {

    const receptionsController = require("../Controllers/ReceptionsController.ts");
    const tokenController = require("../Controllers/TokenController");

    app.route("/api/receptions/:email")
        .get(receptionsController.listAllReceptions)

    app.route("/api/del-receptions/:email&:day&:shours&:sminutes&:ehours&:eminutes")
        .get(tokenController.checkToken, receptionsController.deleteReception)

    app.route("/api/receptions/addReception")
        .post(receptionsController.addReception)
};
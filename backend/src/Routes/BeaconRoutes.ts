import {Application} from "express";

module.exports = function setBeaconRoutes(app: Application) {

    const studentController = require("../Controllers/UsersController.ts")
    const roomController = require("../Controllers/RoomsController.ts");

    app.route("/api/entry-beacon")
       .post(studentController.findStudent, roomController.incrementSeats);

    app.route("/api/exit-beacon")
        .post(studentController.findStudent, roomController.decrementSeats);

};

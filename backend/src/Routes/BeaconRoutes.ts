import {Application} from "express";

module.exports = function setBeaconRoutes(app: Application) {

    const studentController = require("../Controllers/UsersController.ts")
    const roomController = require("../Controllers/RoomsController.ts");
    const notificationController = require("../Controllers/NotificationsController.ts")

    app.route("/api/entry-beacon")
       .post(studentController.findStudent,
           roomController.checkMaximumSeats,
           roomController.incrementSeats,
           notificationController.sendNotification
       );

    app.route("/api/exit-beacon")
       .post(studentController.findStudent,
           roomController.checkMinimumSeats,
           roomController.decrementSeats,
           notificationController.sendNotification
       );

};

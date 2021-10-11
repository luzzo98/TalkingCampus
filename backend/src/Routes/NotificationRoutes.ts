import {Application} from "express";

module.exports = function setNotificationRoutes(app: Application) {

    const notificationsController = require("../Controllers/NotificationsController.ts");

    app.route("/api/get-notifications/:email")
       .get(notificationsController.getNotification);

    app.route("/api/del-notification/:id")
        .get(notificationsController.delNotification);

};

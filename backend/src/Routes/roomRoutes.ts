import {Application} from "express";

module.exports = function setRoomRoutes(app: Application) {

    const roomsController = require("../Controllers/roomsController.ts");

    app.route("/api/rooms")
       .get(roomsController.listAllRooms)

    app.route("/api/add-room")
        .post(roomsController.addRoom)

    app.route("/api/remove-room/:id")
        .get(roomsController.deleteRoom)
};

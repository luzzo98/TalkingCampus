import {Application} from "express";

module.exports = function setRoomRoutes(app: Application) {

    const roomsController = require("../Controllers/RoomsController.ts");
    const tokenController = require("../Controllers/TokenController");

    app.route("/api/rooms/:floor")
       .get(roomsController.listAllRooms)

    app.route("/api/add-room")
        .post(roomsController.addRoom)

    app.route("/api/remove-room/:id")
        .get(roomsController.deleteRoom)

    app.route("/api/edit-room/:id")
        .post(roomsController.updateRoom)

    app.route("/api/add-observer/:room/:id")
        .get(tokenController.checkToken,
            roomsController.addObserver)
};

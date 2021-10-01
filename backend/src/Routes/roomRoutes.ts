import {Application} from "express";

module.exports = function setRoomRoutes(app: Application) {

    const roomsController = require("../Controllers/roomsController.ts");

    app.route("/api/rooms")
       .get(roomsController.listAllRooms)
};

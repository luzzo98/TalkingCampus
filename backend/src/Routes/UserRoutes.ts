import {Application} from "express";

module.exports = function setUserRoutes(app: Application) {

    const usersController = require("../Controllers/UsersController");

    app.route("/api/auth/signin")
        .post(usersController.signin)

    app.route("/api/teachers/:id")
        .get(usersController.getTeacher)

    app.route("/api/students/:id")
        .get(usersController.getStudent)

    app.route("/api/add-observed-room/:observer/:room")
       .get(usersController.addObservedRoom)

    app.route("/api/get-observed-rooms/:email")
        .get(usersController.getObservedRooms)

    app.route("/api/del-observed-room/:email/:room")
        .get(usersController.delObservedRoom)

    app.route("/api/auth/signUpStudent")
        .post(usersController.insertStudent)

    app.route("/api/auth/signUpProfessor")
        .post(usersController.insertProfessor)
};

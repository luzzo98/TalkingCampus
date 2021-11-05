import {Application} from "express";

module.exports = function setUserRoutes(app: Application) {

    const usersController = require("../Controllers/UsersController");
    const tokenController = require("../Controllers/TokenController");

    app.route("/api/auth/signin")
        .post(usersController.signin)

    app.route("/api/teachers/:id")
        .get(usersController.getTeacher)

    app.route("/api/student/:id")
        .get(tokenController.checkToken,
            usersController.getStudent)

    app.route("/api/add-observed-room/:observer/:room")
       .get(tokenController.checkToken,
           usersController.addObservedRoom)

    app.route("/api/get-observed-rooms/:id")
        .get(tokenController.checkToken,
            usersController.getObservedRooms)

    app.route("/api/del-observed-room/:id/:room")
        .get(usersController.delObservedRoom)

    app.route("/api/auth/signUpStudent")
        .post(usersController.insertStudent)

    app.route("/api/auth/signUpProfessor")
        .post(usersController.insertProfessor)
};

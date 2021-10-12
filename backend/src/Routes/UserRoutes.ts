import {Application} from "express";

module.exports = function setUserRoutes(app: Application) {

    const usersController = require("../Controllers/UsersController");

    app.route("/api/auth/signin")
        .post(usersController.signin)

    app.route("/api/teachers/:id")
        .get(usersController.getTeacher)

    app.route("/api/students/:id")
        .get(usersController.getStudent)

    app.route("/api/rooms/add-observers/:observer/:room")
       .get(usersController.addObservedRoom)

    app.route("/api/auth/signUpStudent")
        .post(usersController.insertStudent)

    app.route("/api/auth/signUpProfessor")
        .post(usersController.insertProfessor)
};

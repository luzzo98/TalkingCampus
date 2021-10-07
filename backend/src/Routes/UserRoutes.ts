import {Application} from "express";

module.exports = function setUserRoutes(app: Application) {

    const usersController = require("../Controllers/UsersController");

    app.route("/api/auth/signin")
        .post(usersController.signin)

    app.route("/api/teachers/:id")
        .get(usersController.getTeacher);

    app.route("/api/auth/signUpStudent")
        .post(usersController.insertStudent)

    app.route("/api/auth/signUpProfessor")
        .post(usersController.insertProfessor)
};

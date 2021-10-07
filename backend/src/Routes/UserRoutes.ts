import {Application} from "express";

module.exports = function setUserRoutes(app: Application) {

    const usersController = require("../Controllers/UsersController");

    app.route("/api/teachers/:id")
        .get(usersController.getTeacher);

    app.route("/api/auth/signUpStudent")
        .post(usersController.insertStudent)

};

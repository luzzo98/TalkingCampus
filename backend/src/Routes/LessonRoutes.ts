import {Application} from "express";

module.exports = function setLessonRoutes(app: Application) {

    const lessonsController = require("../Controllers/LessonsController.ts");
    const tokenController = require("../Controllers/TokenController");

    app.route("/api/lessons/:id")
        .get(lessonsController.listAllLessonsInRoom)

    app.route("/api/lessons/addLesson")
        .post(lessonsController.addLesson)

    app.route("/api/get-lessons/:id")
        .get(lessonsController.lessonsFromCourse)

    app.route("/api/del-lesson/:id&:course&:room&:day&:shours&:sminutes&:ehours&:eminutes")
        .get(tokenController.checkToken, lessonsController.deleteLesson)

    app.route("/api/del-all-lessons/:id&:course")
        .get(tokenController.checkToken, lessonsController.deleteAllLesson)
};

import {Application} from "express";

module.exports = function setLessonRoutes(app: Application) {

    const lessonsController = require("../Controllers/LessonsController.ts");

    app.route("/api/lessons/:id")
        .get(lessonsController.listAllLessonsInRoom)

    app.route("/api/lessons/addLesson")
        .post(lessonsController.addLesson)

};

import {Application} from "express";

module.exports = function setLessonRoutes(app: Application) {

    const coursesController = require("../Controllers/CoursesController");

    app.route("/api/courses/:name")
        .get(coursesController.getCourse);

};

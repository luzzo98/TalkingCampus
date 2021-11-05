import {Application} from "express";

module.exports = function setLessonRoutes(app: Application) {

    const coursesController = require("../Controllers/CoursesController");

    app.route("/api/courses/:id")
        .get(coursesController.getCourse);

    app.route("/api/courses/addCourse")
        .post(coursesController.addCourse)

};

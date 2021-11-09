import {Application} from "express";

module.exports = function setLessonRoutes(app: Application) {

    const coursesController = require("../Controllers/CoursesController");
    const tokenController = require("../Controllers/TokenController");

    app.route("/api/courses/:id")
        .get(coursesController.getCourse);

    app.route("/api/courses/addCourse")
        .post(coursesController.addCourse)

    app.route("/api/all-courses/:id")
        .get(tokenController.checkToken, coursesController.getCourses)

    app.route("/api/del-course/:id&:course")
        .get(tokenController.checkToken, coursesController.deleteCourse)
};

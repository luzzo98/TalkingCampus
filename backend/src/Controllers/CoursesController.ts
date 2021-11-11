const Course = require("../Model/Course");

exports.getCourse = function (req, res) {
    Course.find({course_id: req.params.id}, function (err, courses){
        if(err)
            res.send(err)
        res.send(courses)
    })
};

exports.addCourse = function (req, res) {
    const newCourse = new Course(req.body)
    newCourse.save(function (err, course) {
        if (err) {
            res.send(err)
        } else {
            res.status(200).json(course)
        }
    })
};

exports.getCourses = function (req, res) {
    Course.find({teacher_id: req.params.id}, function (err, courses){
        if(err)
            res.send(err)
        res.send(courses)
    })
}

exports.deleteCourse = function (req, res) {
    Course.deleteOne({
        teacher_id: req.params.id,
        course_id: req.params.course,
    }, function (err, notification){
        if(err) {
            res.send(err)
        } else {
            res.status(200).json(notification)
        }
    })
}
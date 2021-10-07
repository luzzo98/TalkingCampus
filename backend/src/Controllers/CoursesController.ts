const Course = require("../Model/Course");

exports.getCourse = function (req, res){
    Course.find({course_id: req.params.name}, function (err, courses){
        if(err)
            res.send(err)
        res.send(courses)
    })
};

exports.addCourse = function (req, res){
    const newCourse = new Course(req.body)
    console.log(newCourse) //todo concella log
    newCourse.save(function (err, studente) {
        if (err) {
            res.send(err)
        } else {
            res.status(200).json(studente)
        }
    })
};
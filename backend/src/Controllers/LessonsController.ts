const Lesson = require("../Model/Lesson.ts");

exports.lessonsFromCourse = function (req, res){
    Lesson.find({course_name: req.params.id}, function (err, lessons){
        if(err)
            res.send(err)
        res.send(lessons);
    })
};

exports.listAllLessonsInRoom = function (req, res) {
    Lesson.find({room: req.params.id}, function (err, lessons){
        if(err)
            res.send(err)
        res.send(lessons);
    })
};

exports.addLesson = function (req, res) {
    const newLesson = new Lesson(req.body)
    newLesson.save(function (err, lesson) {
        if (err) {
            res.send(err)
        } else {
            res.status(200).json(lesson)
        }
    })
};

exports.deleteLesson = function (req, res) {
    Lesson.deleteOne({
        course_name: req.params.course,
        room: req.params.room,
        day: req.params.day,
        "start.hours": req.params.shours,
        "start.minutes": req.params.sminutes,
        "end.hours": req.params.ehours,
        "end.minutes": req.params.eminutes,
    }, function (err, notification) {
        if (err) {
            res.send(err)
        } else {
            res.status(200).json(notification)
        }
    })
};

exports.deleteAllLesson = function (req, res) {
    Lesson.deleteMany({
        course_name: req.params.course
    }, function (err, notification) {
        if (err) {
            res.send(err)
        } else {
            res.status(200).json(notification)
        }
    })
};
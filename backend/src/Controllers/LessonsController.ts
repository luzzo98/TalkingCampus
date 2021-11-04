const Lesson = require("../Model/Lesson.ts");

exports.listAllLessonsInRoom = function (req, res){
    Lesson.find({room: req.params.id}, function (err, lessons){
        if(err)
            res.send(err)
        res.send(lessons);
    })
};

exports.addLesson = function (req, res){
    const newLesson = new Lesson(req.body)
    newLesson.save(function (err, lesson) {
        if (err) {
            res.send(err)
        } else {
            res.status(200).json(lesson)
        }
    })
};
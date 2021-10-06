const Lesson = require("../Model/Lesson.ts");

exports.listAllLessonsInRoom = function (req, res){
    Lesson.find({room: req.params.id}, function (err, lessons){
        if(err)
            res.send(err)
        res.send(lessons);
    })
};

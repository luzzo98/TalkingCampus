const Course = require("../Model/Course");

exports.getCourse = function (req, res){
    Course.find({course_id: req.params.name}, function (err, courses){
        if(err)
            res.send(err)
        res.send(courses)
    })
};

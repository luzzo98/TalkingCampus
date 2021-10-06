const teacher = require("../Model/UsersModels/User.ts");

exports.getTeacher = function (req, res){
    teacher.find({email: req.params.id}, function (err, teacher){
        if(err)
            res.send(err)

        res.send(teacher);
    })
};

const {user, student, teacher} = require("../Model/User.ts");

exports.signin = function (req, res){
    user.find(req.body, function (err, user){
        if(err) res.send(err)
        res.send(user);
    })
};

exports.getTeacher = function (req, res){
    teacher.find({email: req.params.id}, function (err, teacher){
        if(err) res.send(err)
        res.send(teacher);
    })
};

exports.insertStudent = function (req, res) {
    const newStudent = new student(req.body)
    console.log(newStudent) //todo concella log
    newStudent.save(function (err, studente) {
        if (err) {
            res.send(err)
        } else {
            res.status(200).json(studente)
        }
    })
}

exports.insertProfessor = function (req, res) {
    const newTeacher = new teacher(req.body)
    console.log(newTeacher) //todo concella log
    newTeacher.save(function (err, prof) {
        if (err) {
            res.send(err)
        } else {
            res.status(200).json(prof)
        }
    })
}

exports.findStudent = (req, res, next) => {
    student.find({"email": req.body.email}, function(err, student){
        if(err)
            res.send(err)
        else
            if(student !== null)
                next()
            else
                res.status(404).send("Student not found")
    })
}

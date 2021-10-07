const {student, teacher} = require("../Model/User.ts");

exports.signin = function (req, res){
    //TODO finisci
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
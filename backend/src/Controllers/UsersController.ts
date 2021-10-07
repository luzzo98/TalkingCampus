const {student, teacher} = require("../Model/User.ts");

exports.getTeacher = function (req, res){
    teacher.find({email: req.params.id}, function (err, teacher){
        if(err)
            res.send(err)

        res.send(teacher);
    })
};

exports.insertStudent = function (req, res) {
    const newStudent = new student(req.body)
    console.log(newStudent)
    newStudent.save(function (err, studente) {
        if (err) {
            res.sender(err)
        } else {
            res.status(200).json(studente)
        }
    })
}

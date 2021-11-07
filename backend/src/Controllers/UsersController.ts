const {user, student, teacher} = require("../Model/User.ts");

exports.signin = function (req, res) {
    const jwt = require('jsonwebtoken');
    const PRIVATE_SECRET_KEY = 'TalkingCampusKey';

    user.findOne(req.body, function (err, user){
        if(err)
            res.send(err)

        const payload = user ? user.email : ""

        const token = jwt.sign({payload}, PRIVATE_SECRET_KEY, {
            algorithm: 'HS512',
            expiresIn: '2h'
        });
        if (user) {
            res.send({
                email: user.email,
                name: user.name,
                role: user.role,
                picture: user.picture,
                accessToken: token
            })
        } else {
            res.send()
        }
    })
};

exports.getTeacher = function (req, res) {
    teacher.find({email: req.params.id}, function (err, teacher){
        if(err)
            res.send(err)
        res.send(teacher);
    })
};

exports.getStudent = function (req, res) {
    student.findOne({email: req.params.id}, function (err, student){
        if(err)
            res.send(err)
        res.status(200).json(student);
    })
};

exports.insertStudent = function (req, res) {
    const newStudent = new student(req.body)
    newStudent.save(function (err, studente) {
        if (err)
            res.send(err)
        else
            res.status(200).json(studente)

    })
}

exports.insertProfessor = function (req, res) {
    const newTeacher = new teacher(req.body)
    newTeacher.save(function (err, prof) {
        if (err)
            res.send(err)
        else
            res.status(200).json(prof)
    })
}

exports.findStudent = (req, res, next) => {
    student.find({email: req.body.email}, function(err, student){
        if(err)
            res.send(err)
        else
            if(student !== null)
                next()
            else
                res.status(404).send("Student not found")
    })
}

exports.getObservedRooms = (req, res) => {
    student.findOne({email: req.params.id}, function (err, student){
        if(err)
            res.send(err)
        else{
            res.status(200).json(student.observed_rooms)
        }
    })
}

exports.addObservedRoom = function (req, res) {
    student.findOneAndUpdate(
        {email: req.params.id},
        {$push: {observed_rooms: req.params.room}},
        function (err, student){
            if(err)
                res.send(err)
            else
                res.json(student)
        }
    )
}

exports.delObservedRoom = (req, res) => {
    student.findOneAndUpdate(
        {email: req.params.id},
        {$pull: {observed_rooms: req.params.room}},
        function (err, student){
        if(err)
            res.send(err)
        else{
            res.status(200).json(student.observed_rooms)
        }
    })
}

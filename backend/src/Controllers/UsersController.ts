const {user, student, teacher} = require("../Model/User.ts");
const PRIVATE_SECRET_KEY = 'TalkingCampusKey';
const jwt = require('jsonwebtoken');

exports.signin = function (req, res) {
    user.find(req.body, function (err, user){
        if(err)
            res.send(err)
        const token = jwt.sign({user}, PRIVATE_SECRET_KEY, {
            algorithm: 'HS512',
            expiresIn: '2h'
        });
        let val = user[0]

        // console.log("USER", val) //TODO elimina i log
        // console.log("TOKEN",token)
        // val.accessToken = token
        // console.log("USER + TOKEN", val)
        // res.send(val);

        const r = {
            email: val.email,
            name: val.name,
            role: val.role,
            accessToken: token
        }
        res.send(r)
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

exports.addObservedRoom = function (req, res) {
    student.findOneAndUpdate(
        {email: req.params.observer},
        {$push: {observed_rooms: String(req.params.room)}},
        function (err, student){
            if(err)
                res.send(err)
            else
                res.json(student)
        }
    )
}

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
    student.findOne({email: req.params.email}, function (err, student){
        if(err)
            res.send(err)
        else{
            //console.log(student)
            res.status(200).json(student.observed_rooms)
        }
    })
}

exports.delObservedRoom = (req, res) => {
    student.findOneAndUpdate(
        {email: req.params.email},
        {$pull: {observed_rooms: req.params.room}},
        function (err, student){
        if(err)
            res.send(err)
        else{
            //console.log(student)
            res.status(200).json(student.observed_rooms)
        }
    })
}

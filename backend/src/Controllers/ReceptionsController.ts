const reception = require("../Model/Reception.ts");

exports.listAllReceptions = function (req, res){
    reception.find({teacher_email: req.params.email}, function (err, receptions){
        if(err)
            res.send(err)

        res.send(receptions);
    })
};

exports.addReception = function (req, res){
    const newReception = new reception(req.body)
    newReception.save(function (err, reception) {
        if (err) {
            res.send(err)
        } else {
            res.status(200).json(reception)
        }
    })
};

exports.deleteReception = function (req, res){
    reception.deleteOne({
        teacher_email: req.params.id,
        day: req.params.day,
        "start.hours" : req.params.shours,
        "start.minutes": req.params.sminutes,
        "end.hours" : req.params.ehours,
        "end.minutes": req.params.eminutes,
    }, function (err, notification){
        if(err) {
            res.send(err)
        } else {
            res.status(200).json(notification)
        }
    })
};
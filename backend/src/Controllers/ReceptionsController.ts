const Reception = require("../Model/Reception.ts");

exports.listAllReceptions = function (req, res){
    Reception.find({teacher_email: req.params.email}, function (err, receptions){
        if(err)
            res.send(err)

        res.send(receptions);
    })
};

exports.addReception = function (req, res){
    const newReception = new Reception(req.body)
    newReception.save(function (err, reception) {
        if (err) {
            res.send(err)
        } else {
            res.status(200).json(reception)
        }
    })
};
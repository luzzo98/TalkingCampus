const Reception = require("../Model/Reception.ts");

exports.listAllReceptions = function (req, res){
    Reception.find({teacher_email: req.params.email}, function (err, receptions){
        if(err)
            res.send(err)

        res.send(receptions);
    })
};

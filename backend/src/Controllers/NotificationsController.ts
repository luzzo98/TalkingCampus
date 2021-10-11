const notification = require("../Model/Notification.ts");

exports.getNotification = function (req, res){
    notification.find({user_id: req.params.email}, function (err, notifications){
        if(err)
            res.send(err)
        else
            res.status(200).json(notifications.map(n => n.message))
    })
}

exports.sendNotification = function (req, res){
    const newNotification = new notification(req.body.notification)
    newNotification.save(function (err, notification){
        if(err)
            res.send(err)
        else
            res.status(200).json(notification)
    });

}

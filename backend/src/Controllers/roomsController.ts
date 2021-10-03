const Room = require("../Model/room.ts");

exports.listAllRooms = function (req, res){
    Room.find({}, function (err, rooms){
        if(err)
            res.send(err)
        res.send(rooms);
    })
};

exports.addRoom = function (req, res){
    const room = new Room(req.body)
    room.save(function (err, room){
        if(err)
            res.send(err)

        res.status(200).json(room)
    })
};

exports.deleteRoom = function (req, res){
    Room.deleteOne({"name" : req.params.id}, function (err, room){
        if(err)
            res.send(err)

        res.status(200).json(room)
    })
};

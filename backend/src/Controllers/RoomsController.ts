import { ObjectId } from "mongodb";

const Room = require("../Model/Room.ts");

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

exports.updateRoom = function(req, res){
    Room.findOneAndUpdate({"_id" : new ObjectId(req.params.id)}, req.body, function (err, room){
        if(err)
            res.send(err)
        if(room === null)
            res.status(404).send("Room not found")
        else
            res.json(room)
    })
}

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

exports.addObserver = function (req, res){
   Room.findOneAndUpdate(
        {name: req.params.room},
        {$push: {observers: String(req.params.observer)}},
        function (err, room){
            if(err)
                res.send(err)
            else
                res.json(room)
        }
    )
}

function changeSeats(room: string, increment:number, res){
    Room.findOneAndUpdate(
        {name: room},
        {$inc: {occupied_seats: increment}},
        function (err, room){
            if(err)
                res.send(err)
            else
                res.json(room)
        }
    )
}

exports.incrementSeats = (req, res) => changeSeats(req.body.room_name, 1, res)

exports.decrementSeats = (req, res) => changeSeats(req.body.room_name, -1, res)


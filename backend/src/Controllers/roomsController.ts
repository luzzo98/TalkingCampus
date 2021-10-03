import { ObjectId } from "mongodb";
import {Schema} from "mongoose";

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
    Room.deleteOne({"_id" : new ObjectId(req.params.id)}, function (err, room){
        if(err)
            res.send(err)

        res.status(200).json(room)
    })
};

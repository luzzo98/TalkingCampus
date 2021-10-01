const Rooms = require("../Model/room.ts");

exports.listAllRooms = function (req, res){
    Rooms.find({}, function (err, rooms){
        if(err){
            console.log(err)
            res.send(err)
        }
        res.send(rooms);
    })
};

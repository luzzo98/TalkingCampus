const mongoose = require("mongoose");

const cors = require("cors");
const express = require("express");

const setRoomRoutes = require("./Routes/roomRoutes.ts")

const app = express();
const PORT = 80;

//middlewares per richieste json
app.use(cors());
app.use(express.json());

//vanno aggiunte le routes
setRoomRoutes(app);

//connessione a mongo db
mongoose.connect('mongodb://localhost:27017/talkingCampus');

//il server è on
app.listen(PORT, function () {
    console.log('Listening on ' + PORT);
});

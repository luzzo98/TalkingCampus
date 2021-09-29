const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");

const app = express();
const PORT = 80;

//middlewares per richieste json
app.use(cors());
app.use(express.json());

//vanno aggiunte le routes
//...

//connessione a mongo db
mongoose.connect('mongodb://mongo:27017/talkingCampus');

//il server è on
app.listen(PORT, function () {
    console.log('Listening on ' + PORT);
});

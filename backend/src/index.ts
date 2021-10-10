const mongoose = require("mongoose");

const cors = require("cors");
const express = require("express");

const setRoomRoutes = require("./Routes/RoomRoutes.ts")
const setLessonRoutes = require("./Routes/LessonRoutes.ts")
const setCoursesRoutes = require("./Routes/CourseRoutes.ts")
const setUserRoutes = require("./Routes/UserRoutes.ts")
const setReceptionRoutes = require("./Routes/ReceptionRoutes.ts")
const setBeaconRoutes = require("./Routes/BeaconRoutes.ts")

const app = express();
const PORT = 80;

//middlewares per richieste json
app.use(cors());
app.use(express.json());

//vanno aggiunte le routes
setRoomRoutes(app);
setLessonRoutes(app);
setCoursesRoutes(app);
setUserRoutes(app);
setReceptionRoutes(app);
setBeaconRoutes(app);

//connessione a mongo db
mongoose.connect('mongodb://localhost:27017/talkingCampus');

//il server è on
app.listen(PORT, function () {
    console.log('Listening on ' + PORT);
});

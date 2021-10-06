db.lessons.insertMany([{
    "course_name" : "Algebra",
    "room" : "Aula 1.1",
    "day" : "Lunedì",
    "start" : {
        "hours":NumberInt(9),
        "minutes":NumberInt(0)
        },
    "end" : {
        "hours":NumberInt(12),
        "minutes":NumberInt(0)
        },
    },
    {
        "course_name" : "Algebra",
        "room" : "Aula 1.1",
        "day" : "Mercoledì",
        "start" : {
            "hours":NumberInt(15),
            "minutes":NumberInt(0)
            },
        "end" : {
            "hours":NumberInt(17),
            "minutes":NumberInt(0)
            }
    },
    {
        "course_name" : "Calcolo numerico",
        "room" : "Aula 1.1",
        "day" : "Martedì",
        "start" : {
            "hours":NumberInt(10),
            "minutes":NumberInt(0)
        },
        "end" : {
            "hours":NumberInt(14),
            "minutes":NumberInt(0)
        }
    }])
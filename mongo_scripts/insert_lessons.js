db.lessons.insertMany([{
    "course_name" : "Algebra",
    "room" : "Aula 1.1",
    "day" : "Luned�",
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
        "day" : "Mercoled�",
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
        "day" : "Marted�",
        "start" : {
            "hours":NumberInt(10),
            "minutes":NumberInt(0)
        },
        "end" : {
            "hours":NumberInt(14),
            "minutes":NumberInt(0)
        }
    }])
db = new Mongo().getDB("talkingCampus")

db.createCollection("courses", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["course_id", "teacher_id"],
      properties: {
        teacher_id: {
          bsonType: "string",
          description: "must be a valid teacher email"
        },
        course_id: {
          bsonType: "string",
          pattern: "^[a-zA-Z]+([ ]{1}[a-zA-Z0-9]+)*$",  
          description: "must be a valid string: basically, one word with only letters. Eventually, it can contain more words with, from the second one, letters and numbers"  
        },
    }
  }
 }
});

db.createCollection("lessons", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["course_id", "room_id", "start_time", "end_time"],
      properties: {
        course_id: {
          bsonType: "string",
          description: "must be a valid course name"
        },
        room_id: {
          bsonType: "string",
          description: "must be a valid room id"
        },
        start_time: {
          bsonType: "int",
          minimum: 0,
          maximum: 23,  
          description: "must be a valid and unique start hour"
        },
        end_time: {
          bsonType: "int",
          minimum: 0,
          maximum: 23,  
          description: "must be a valid end hour"
        },
    }
  }
 }
});

db.createCollection("notifications", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id"],
      properties: {
        user_id: {
          bsonType: "string",
          description: "must be a valid user email"
        },
        message: {
          bsonType: "string",
          pattern: "^.{1,50}$",
          description: "notification message"
        }
    }
  }
 }
});

db.createCollection("receptions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["course_id", "room_id", "start_time", "end_time"],
      properties: {
        teacher_id: {
          bsonType: "string",
          description: "must be a valid teacher email"
        },
        room_id: {
          bsonType: "string",
          pattern: "^Aula[1-3].([1-9]){1,2}$",  
          description: "must be unique classroom id: it's built on floor and progressive room number"
        },
        start_time: {
          bsonType: "int",
          minimum: 0,
          maximum: 23, 
          description: "must be a valid and unique start hour"
        },
        end_time: {
          bsonType: "int",
          minimum: 0,
          maximum: 23,  
          description: "must be a valid end hour"
        },
    }
  }
 }
});

db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "psw", "role"],
      properties: {
        email: {
          bsonType: "string",
          pattern: "[a-z]+\.[a-z]+@campus\.it",
          description: "must be a valid email: <user>@campus.it"
        },
        psw: {
          bsonType: "string",
          pattern: "^.{8,}$",  
          description: "must be a valid psw string: at least 8 characters"
        },
        role: {
          enum: ["student", "teacher", "admin"],
          description: "can be only a value in the enum and it's required"  
        },
        name: {
          bsonType: "string",
          pattern: "^[a-zA-Z]+$",
          description: "must be a valid name string: at least one character (only letters accepted)"
        },
        surname: {
          bsonType: "string",
          pattern: "^[a-zA-Z]+([ ]{1}[a-zA-Z]+){0,2}$",  
          description: "must be a valid surname string: surnames of several words allowed"  
        },
        badge_number: {
          bsonType: "string",
          pattern: "^[0-9]{10}$",  
          description: "must be a number of 10 ciphers"  
        },
        phone_number: {
          bsonType: "string",
          pattern: "^[0-9]{10}$",  
          description: "must be a number of 10 ciphers"  
        },
        university_name: {
          bsonType: "string",
          pattern: "^[a-zA-Z]+([ ]{1}[a-zA-Z]+)*$",
          description: "must be a valid name"  
        },
        picture: {
          bsonType: "binData",
          description: "must be an user's image"
       }
    }
  }
 }
});

db.createCollection("rooms", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "maximum_seats", "type", "position"],
      properties: {
        type: {
          enum: ["Aula Studio", "Aula", "Bagno", "Mensa", "Segreteria", "Laboratorio"],
          description: "can be only a value in the enum and it's required"  
        },
        maximum_seats: {
          bsonType: "int",
          minimum: 0,
          description: "must be a positive number"  
        },
        occupied_seats: {
          bsonType: "int",
          minimum: 0,
          description: "must be a positive number minor than maximum_seats_value"   
        },
        name: {
          bsonType: "string",
          pattern: "^(Aula|Aula Studio|Bagno|Mensa|Segreteria|Laboratorio) [1-3].([0-9]){1,2}$",  
          description: "must be a valid string: basically, one word with only letters. Eventually, it can contain more words with, from the second one, letters and numbers"  
        },
        position: {
          bsonType: "array",
          maxItems: 2,
          items: {
            bsonType: "double",
            description: "position of room on map"
          }
        },
        observers: {
          bsonType: "array",
          uniqueItems: true,
          items: {
            bsonType: "string",
            description: "observer email"
          }
        },
        adding_info: {
           bsonType: "object",
           properties: {
               phone_number: {
                 bsonType: "string",
                 pattern: "^[0-9]{10}$",
                 description: "possible room phone number"
               },
               opening_hour: {
                   bsonType: "object",
                   properties: {
                       hour: {
                           bsonType: "int",
                           minimum: 0,
                           maximum: 23,
                           description: "must be a valid hour"  
                       },
                       minutes: {
                           bsonType: "int",
                           minimum: 0,
                           maximum: 59,
                           description: "must be valid minutes"  
                       }
                  },
                  description: "room opening hour"
               },
               closing_hour: {
                   bsonType: "object",
                   properties: {
                       hour: {
                           bsonType: "int",
                           minimum: 0,
                           maximum: 23,
                           description: "must be a valid hour"  
                       },
                       minutes: {
                           bsonType: "int",
                           minimum: 0,
                           maximum: 59,
                           description: "must be valid minutes"  
                       }
                  },
                  description: "room closing hour"
               },
               notes: {
                 bsonType: "string",
                 pattern: "^.{1,50}$",
                 description: "notification message"
               }
           }
        }
    }
  }
 }
});

db.rooms.insertMany([
    {"name":"Aula 1.1", "maximum_seats":NumberInt(100), "type":"Aula", "position":[40.757059, -74.198484]},
    {"name":"Aula Studio 1.1", "maximum_seats":NumberInt(50), "type":"Aula Studio", "position":[40.750755, -74.195824]},
    {"name":"Aula Studio 1.2", "maximum_seats":NumberInt(50), "type":"Aula Studio", "position":[40.750755, -74.201059]},
    {"name":"Bagno 1.1", "maximum_seats":NumberInt(4), "type":"Bagno", "position":[40.736194, -74.184837]},
    {"name":"Aula 1.2", "maximum_seats":NumberInt(150), "type":"Aula", "position":[40.735226, -74.20045]},
    {"name":"Aula 1.3", "maximum_seats":NumberInt(150), "type":"Aula", "position":[40.735226, -74.19450]},
    {"name":"Bagno 1.2", "maximum_seats":NumberInt(3), "type":"Bagno", "position":[40.733275, -74.190587]},
    {"name":"Bagno 1.3", "maximum_seats":NumberInt(3), "type":"Bagno", "position":[40.753694, -74.163894]},
    {"name":"Aula Studio 1.3", "maximum_seats":NumberInt(70), "type":"Aula Studio", "position":[40.72755, -74.202175]},
    {"name":"Aula Studio 1.4", "maximum_seats":NumberInt(70), "type":"Aula Studio", "position":[40.72755, -74.198398]},
    {"name":"Mensa 1.1", "maximum_seats":NumberInt(200), "type":"Mensa", "position":[40.745891, -74.158401]},
    {"name":"Laboratorio 1.1", "maximum_seats":NumberInt(150), "type":"Laboratorio", "position":[40.728201, -74.178485]},
    {"name":"Laboratorio 1.2", "maximum_seats":NumberInt(150), "type":"Laboratorio", "position":[40.728201, -74.172306]},
    {"name":"Segreteria 1.1", "maximum_seats":NumberInt(0), "type":"Segreteria", "position":[40.728201, -74.172306],
        "adding_info":{"phone_number":"3325463745", "opening_hour":{"hours":NumberInt(9),"minutes":NumberInt(0)}, "closing_hour":{"hours":NumberInt(16),"minutes":NumberInt(0)}}},
        
    {"name":"Aula 2.1", "maximum_seats":NumberInt(200), "type":"Aula", "position":[40.757059, -74.198484]},
    {"name":"Aula 2.2", "maximum_seats":NumberInt(170), "type":"Aula", "position":[40.757059, -74.194536]},
    {"name":"Aula 2.3", "maximum_seats":NumberInt(170), "type":"Aula", "position":[40.756710, -74.18887]},
    {"name":"Aula 2.4", "maximum_seats":NumberInt(180), "type":"Aula", "position":[40.756710, -74.181919]},
    {"name":"Mensa 2.1", "maximum_seats":NumberInt(200), "type":"Mensa", "position":[40.74745, -74.16200]},
    {"name":"Bagno 2.1", "maximum_seats":NumberInt(3), "type":"Bagno", "position":[40.75070, -74.19127]},
    {"name":"Aula 2.5", "maximum_seats":NumberInt(70), "type":"Aula", "position":[40.72787, -74.16200]},
    {"name":"Bagno 2.2", "maximum_seats":NumberInt(5), "type":"Bagno", "position":[40.75330, -74.16337]},
    {"name":"Bagno 2.3", "maximum_seats":NumberInt(5), "type":"Bagno", "position":[40.73711, -74.185009]},
    {"name":"Aula Studio 2.1", "maximum_seats":NumberInt(40), "type":"Aula Studio", "position":[40.750768, -74.2019]},
    {"name":"Aula Studio 2.2", "maximum_seats":NumberInt(40), "type":"Aula Studio", "position":[40.73451, -74.19522]},
    {"name":"Laboratorio 2.1", "maximum_seats":NumberInt(125), "type":"Laboratorio", "position": [40.75245, -74.18363]},
    {"name":"Laboratorio 2.2", "maximum_seats":NumberInt(125), "type":"Laboratorio", "position": [40.75245, -74.18037]},
    {"name":"Bagno 2.4", "maximum_seats":NumberInt(3), "type":"Bagno", "position":[40.73327, -74.16844]},
    {"name":"Segreteria 2.1", "maximum_seats":NumberInt(0), "type":"Segreteria", "position":[40.74556, -74.15917],
        "adding_info":{"phone_number":"3352788715", "opening_hour":{"hours":NumberInt(9),"minutes":NumberInt(0)}, "closing_hour":{"hours":NumberInt(16),"minutes":NumberInt(0)}}},

    {"name":"Aula Studio 3.1", "maximum_seats":NumberInt(50), "type":"Aula Studio", "position":[40.75759, -74.19651]},
    {"name":"Aula Studio 3.2", "maximum_seats":NumberInt(50), "type":"Aula Studio", "position":[40.75050, -74.19470]},
    {"name":"Bagno 3.1", "maximum_seats":NumberInt(3), "type":"Bagno", "position":[40.75362, -74.16320]},
    {"name":"Laboratorio 3.1", "maximum_seats":NumberInt(4), "type":"Laboratorio", "position":[40.74036, -74.15780]},
    {"name":"Laboratorio 3.2", "maximum_seats":NumberInt(150), "type":"Laboratorio", "position":[40.74335, -74.15780]},
    {"name":"Laboratorio 3.3", "maximum_seats":NumberInt(150), "type":"Laboratorio", "position":[40.74335, -74.15780]},
    {"name":"Bagno 3.2", "maximum_seats":NumberInt(3), "type":"Bagno", "position":[40.73301, -74.16870]},
    {"name":"Bagno 3.3", "maximum_seats":NumberInt(3), "type":"Bagno", "position":[40.73301, -74.19007]},
    {"name":"Bagno 3.4", "maximum_seats":NumberInt(3), "type":"Bagno", "position":[40.7319, -74.1696]},
    {"name":"Bagno 3.5", "maximum_seats":NumberInt(3), "type":"Bagno", "position":[40.75050, -74.1914]},
    {"name":"Bagno 3.6", "maximum_seats":NumberInt(3), "type":"Bagno", "position":[40.75206, -74.1914]},
    {"name":"Laboratorio 3.4", "maximum_seats":NumberInt(125), "type":"Laboratorio", "position":[40.73203, -74.18397]},
    {"name":"Laboratorio 3.5", "maximum_seats":NumberInt(125), "type":"Laboratorio", "position":[40.73203, -74.18037]},
    {"name":"Laboratorio 3.6", "maximum_seats":NumberInt(125), "type":"Laboratorio", "position":[40.73203, -74.17676]},
    {"name":"Segreteria 3.1", "maximum_seats":NumberInt(0), "type":"Segreteria", "position":[40.75265, -74.15651],
        "adding_info":{"phone_number":"3325463745", "opening_hour":{"hours":NumberInt(9),"minutes":NumberInt(0)}, "closing_hour":{"hours":NumberInt(16),"minutes":NumberInt(0)}}}
])
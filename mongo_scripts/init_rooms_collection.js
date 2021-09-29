use talkingCampus
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
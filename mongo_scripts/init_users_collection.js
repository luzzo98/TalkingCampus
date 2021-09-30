db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "psw", "role"],
      properties: {
        email: {
          bsonType: "string",
          pattern: "^[a-z]+\.[a-z]+@(studio.unibo|unibo)\.it$",
          description: "must be a valid email: <firstname>.<lastname>@(<studio.unibo>|<unibo>).it"
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
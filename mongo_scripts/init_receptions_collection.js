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
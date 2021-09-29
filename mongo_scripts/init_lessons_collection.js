use talkingCampus
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
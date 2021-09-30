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
          description: "must be a valid room id"
        },
        start_time: {
          bsonType: "date", 
          description: "must be a valid and unique date"
        },
        end_time: {
          bsonType: "date",
          description: "must be valid and based on start_time"
        },
    }
  }
 }
});
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
          bsonType: "date",
          description: "must be a valid date"
        },
        end_time: {
          bsonType: "date",
          description: "must be valid and based on start_time"
        },
    }
  }
 }
});
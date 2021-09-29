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
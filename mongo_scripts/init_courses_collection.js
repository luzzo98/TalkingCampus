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
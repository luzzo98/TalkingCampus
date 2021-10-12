import {model, Schema} from "mongoose";

interface Notification {
    room_id: string,
    message: string
}

const notificationSchema = new Schema<Notification>({
    room_id: String,
    message: String
});

module.exports = model<Notification>("notification", notificationSchema);

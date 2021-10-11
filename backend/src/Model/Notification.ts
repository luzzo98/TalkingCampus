import {model, Schema} from "mongoose";

interface Notification {
    user_id: string,
    message: string
}

const notificationSchema = new Schema<Notification>({
    user_id: String,
    message: String
});

module.exports = model<Notification>("notification", notificationSchema);

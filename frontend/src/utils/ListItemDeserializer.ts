import {ListItem} from "../Model";

export function mapToNotification(jsonElement: any): ListItem{
    return {
        id: jsonElement._id,
        content: jsonElement.message
    };
}

export function mapToClass(room: any): ListItem{
    return {
        id: room,
        content: room
    };
}

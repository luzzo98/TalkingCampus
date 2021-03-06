import {RoomOnMap} from "../Model";

export function mapToRoom(jsonElement: any): RoomOnMap{
    return {
        id: jsonElement._id,
        type: jsonElement.type,
        occupied_seats: jsonElement.occupied_seats,
        maximum_seats: jsonElement.maximum_seats,
        name: jsonElement.name,
        floor: jsonElement.floor,
        position: jsonElement.position,
        adding_info: !jsonElement.adding_info ? {}
            : { phone_number: !jsonElement.adding_info.phone_number ? "" : jsonElement.adding_info.phone_number,
                opening_hour: !jsonElement.adding_info.opening_hour ? null : jsonElement.adding_info.opening_hour,
                closing_hour: !jsonElement.adding_info.closing_hour ? null : jsonElement.adding_info.closing_hour,
                notes: !jsonElement.adding_info.notes ? null: jsonElement.adding_info.notes
            },
        isMarkerSet: true,
    };
}

import * as utils from "../utils/utils"
import * as roomDeserializer from "../utils/RoomDeserializer";
import {RoomOnMap} from "../Model";

const API_URL = `${utils.BASE_URL}${utils.NODE_PORT}`

class MapService {

    getRooms(floor: number, onComplete: (result: RoomOnMap[]) => void) {
        fetch(API_URL + `/api/rooms/${floor}`)
            .then((res: Response) => res.json())
            .then((json:JSON[]) => json.map(value => roomDeserializer.mapToRoom(value)))
            .then(markers => onComplete(markers));
    }

}

export default new MapService()

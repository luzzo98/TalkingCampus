import * as utils from "../utils/utils"
import * as roomDeserializer from "../utils/RoomDeserializer";
import {ListItem, RoomOnMap, Student} from "../Model";
import * as userDeserializer from "../utils/UserDeserializer";
import * as listItemDeserializer from "../utils/ListItemDeserializer";

const API_URL = `${utils.BASE_URL}${utils.NODE_PORT}`

class PrivateContentService {

    private workOnListItems(url: string,
                            onComplete: (items: ListItem[]) => void,
                            mapper: (value: any) => ListItem){

        fetch(url).then((res: Response) => res.json())
                  .then((json:JSON[]) => json.map( (value: any) => mapper(value)))
                  .then(items => onComplete(items))

    }

    getNotifications(room: string, onComplete: (items: ListItem[]) => void){
        this.workOnListItems(API_URL + `/api/get-notifications/${room}`,
                                 onComplete,
                                 listItemDeserializer.mapToNotification)
    }

    getObsRoom(email: string, onComplete: (items: ListItem[]) => void){
        this.workOnListItems(API_URL + `/api/get-observed-rooms/${email}`,
                                 onComplete,
                                 listItemDeserializer.mapToClass)
    }

    deleteNotification(id: string){
        fetch(API_URL + `/api/del-notification/${id}`)
    }

    deleteObsRoom(email:string, room: string){
        fetch(API_URL + `/api/del-observed-room/${email}/${room}`)
    }

}

export default new PrivateContentService()

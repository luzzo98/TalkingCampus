import * as utils from "../utils/utils"
import {ListItem} from "../Model";
import * as listItemDeserializer from "../utils/ListItemDeserializer";
import authHeader from "./AuthHeader";

const API_URL = `${utils.BASE_URL}${utils.NODE_PORT}`

class PrivateContentService {

    private workOnListItems(url: string,
                            onComplete: (items: ListItem[]) => void,
                            mapper: (value: any) => ListItem){

        fetch(url, {
            headers: authHeader()
        }).then((res: Response) => res.json())
                  .then((json:JSON[]) => json.map( (value: any) => mapper(value)))
                  .then(items => onComplete(items))

    }

    getNotifications(room: string, email: string, onComplete: (items: ListItem[]) => void){
        this.workOnListItems(API_URL + `/api/get-notifications/${room}/${email}`,
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

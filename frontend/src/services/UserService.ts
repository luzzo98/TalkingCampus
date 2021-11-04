import axios from 'axios';
import * as utils from "../utils/utils"
import authHeader from './AuthHeader';

const API_URL = `${utils.BASE_URL}${utils.NODE_PORT}/api/user/`;

class UserService {

    getUserInfo() {
        return axios.get(API_URL + 'userInfo', { headers: authHeader() });
    }

    getUserNotifications() {
        return axios.get(API_URL + 'notifications', { headers: authHeader() });
    }

}

export default new UserService();

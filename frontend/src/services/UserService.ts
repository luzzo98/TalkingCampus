import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = 'http://localhost:80/api/user/'; //todo cambiare test e aggiungerlo nel backend

class UserService {

    getUserInfo() {
        return axios.get(API_URL + 'userInfo', { headers: authHeader() });
    }

    getUserNotifications() {
        return axios.get(API_URL + 'notifications', { headers: authHeader() });
    }

}

export default new UserService();
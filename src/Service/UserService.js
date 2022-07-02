import axios from "axios";
const API_URL = "http://localhost:9091/api";
class UserService {

    async addUserInfo(user) {
        console.log("from user service-->", axios.post(`${API_URL}/addUser/`, user))
        return await axios.post(`${API_URL}/addUser/`, user);
    }



}


export default new UserService();
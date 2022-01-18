import axios from "axios"
import {UserInterface} from './../interfaces/InterfaceUser'
const url = 'https://randomuser.me/api/';

class RandomUser {
    // model used to get random user and typing it with typescript
    static async getOne() {
        const result =  await axios.get(url);
        const user = result.data.results[0] as User;
        
        return user
    }

}

export default RandomUser;
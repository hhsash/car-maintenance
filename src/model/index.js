import User from './User';
import Models from './Models';
import ModelCar from '../services/modelCar.service';
import UserService from '../services/user.service';

class Model {
    constructor() {
        this.user = new User(UserService);
        this.models = new Models(ModelCar);
    }
}

export default Model;

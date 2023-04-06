import User from './User';
import Cars from './Cars';
import CarService from '../services/cars.service';
import UserService from '../services/user.service';
import PartService from '../services/parts.service';
import Parts from './Parts';

class Model {
    constructor() {
        this.user = new User(UserService);
        this.models = new Cars(CarService);
        this.partsList = new Parts(PartService);
    }
}

export default Model;

import { makeAutoObservable } from 'mobx';

class Parts {
    partsList = [];

    constructor(requests) {
        this.services = requests;
        makeAutoObservable(this);
    }
}
export default Parts;

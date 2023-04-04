import { makeAutoObservable, runInAction } from 'mobx';

class User {
    isAuth = false;

    name = 'string';

    password = 'string';

    constructor(Requests) {
        this.services = new Requests();
        makeAutoObservable(this);
    }

    login(params) {
        try {
            const { data } = this.services.sendLoginData(params);
            runInAction(() => {
                this.isAuth = data;
                this.state = 'done';
            });
        } catch (error) {
            this.state = 'error';
        }
    }

    register(params) {
        try {
            const { data } = this.services.sendRegData(params);
            runInAction(() => {
                this.isAuth = data;
                this.state = 'done';
            });
        } catch (error) {
            this.state = 'error';
        }
    }
}

export default User;

import { makeAutoObservable, runInAction } from 'mobx';

class User {
    isAuth = false;

    state = '';

    constructor(Requests) {
        this.services = new Requests();
        makeAutoObservable(this);
    }

    logout() {
        try {
            const { data } = this.services.logout();
            runInAction(() => {
                this.isAuth = data;
                this.state = 'done';
            });
        } catch (error) {
            this.state = 'error';
        }
    }

    async login(params) {
        try {
            this.state = 'loading';
            const data = await this.services.sendLoginData(params);
            runInAction(() => {
                this.isAuth = data;
                this.state = 'done';
            });
            return data;
        } catch (error) {
            this.state = 'error';
        }
        return null;
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

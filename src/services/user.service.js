/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import API from '../API';

class UserService {
    sendLoginData({ email, password }) {
        API.post('User/Login', {
            name: email,
            password
        })
            .then((response) => {
                localStorage.setItem('token', response.data);
                return response;
            })
            .catch((error) => {
                throw new Error(error);
            });
    }

    sendRegData({ email, password }) {
        return API.post(
            'User/Register',
            {
                name: email,
                password
            },
            {
                Accept: '*/*',
                'content-Type': 'application/json'
            }
        ).catch((error) => {
            throw new Error(error);
        });
    }

    logout() {
        localStorage.removeItem('token');
    }
}

export default UserService;

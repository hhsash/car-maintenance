/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import API from '../API';

class ModelUser {
    sendLoginData({ email, password }) {
        API.post(
            'User/Login',
            {
                name: email,
                password
            },
            {
                Accept: '*/*',
                'content-Type': 'application/json'
            }
        )
            .then((response) => {
                localStorage.setItem('token', response.data);
                if (response.data) {
                    API.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
                        'token'
                    )}`;
                } else {
                    delete API.defaults.headers.common.Authorization;
                }
            })
            .catch((error) => console.log(error));
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
        )
            .then((response) => {
                console.log(response);

                // localStorage.setItem('token', response.data);
                // if (response.data) {
                //     API.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
                //         'token'
                //     )}`;
                // } else {
                //     delete API.defaults.headers.common.Authorization;
                // }
            })
            .catch((error) => console.log(error));
    }
}

export default ModelUser;

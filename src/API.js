import axios from 'axios';

export const baseURL = 'https://service-api-dima.azurewebsites.net/';

const headers = {
    'Content-Type': 'application/json'
};

const API = axios.create({
    baseURL,
    headers,
    withCredentials: true
});

API.interceptors.request.use((config) => {
    const conf = config;
    if (localStorage.getItem('token')) {
        conf.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return conf;
});

export default API;

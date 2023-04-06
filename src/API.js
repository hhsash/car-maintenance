import axios from 'axios';

export const baseURL = 'https://service-api-dima.azurewebsites.net/';

const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
};

const API = axios.create({
    baseURL,
    headers,
    withCredentials: true
});

export default API;

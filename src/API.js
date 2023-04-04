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

// const onRequestSuccess = async (config) => {
//     if (config?.headers) {
//         config.headers.Authorization = `Bearer ${JSON.parse(
//             localStorage.getItem('token')
//         )}`;
//     }

//     return config;
// };

// API.interceptors.request.use(onRequestSuccess);

export default API;

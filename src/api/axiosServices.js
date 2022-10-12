import axios from 'axios';
import queryString from 'query-string';

const URI = 'http://127.0.0.1:5000/api';
const URI_ONL = 'https://server-eform.vercel.app/api';

const axiosServices = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? URI_ONL : URI,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: (params) => queryString.stringify(params)
});

axiosServices.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        throw error;
    }
);

axiosServices.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        throw error;
    }
);

export default axiosServices;

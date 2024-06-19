import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://ec2-3-39-193-47.ap-northeast-2.compute.amazonaws.com:8080/api',
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance;

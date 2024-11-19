import axios from 'axios';
import { createBrowserHistory } from 'history';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BACK_URL}/api`,
});

const history = createBrowserHistory();

let isRefreshing = false; 
let refreshSubscribers = []; 
let isLoggedOut = false; 

const onRrefreshed = (token) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response &&
            error.response.status === 401 &&
            error.response.data.code === 'JWT_001' &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    const token = localStorage.getItem('token');
                    const refreshResponse = await axios.post(
                        `${process.env.REACT_APP_BACK_URL}/api/auth/token/refresh`,
                        null,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    const newToken = refreshResponse.headers.authorization;
                    localStorage.setItem('token', newToken);
                    isRefreshing = false;

                    onRrefreshed(newToken); 

                    return instance(originalRequest);
                } catch (refreshError) {
                    isRefreshing = false;

                    if (
                        refreshError.response &&
                        refreshError.response.status === 403 &&
                        refreshError.response.data.code === 'JWT_002'
                    ) {
                        if (!isLoggedOut) {
                            isLoggedOut = true;
                            alert('장시간 활동이 없어 자동으로 로그아웃 되었습니다.');
                            localStorage.removeItem('token');
                            history.push('/');
                            history.go(0);
                        }
                    }

                    return Promise.reject(refreshError);
                }
            } else {
                return new Promise((resolve) => {
                    addRefreshSubscriber((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(instance(originalRequest));
                    });
                });
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
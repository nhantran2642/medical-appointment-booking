import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            response_object.header("Access-Control-Allow-Origin", "*");
            response_object.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        }

        console.log('Request Details:', {
            url: config.baseURL + config.url,
            method: config.method,
            headers: config.headers,
            data: config.data,
        });

        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => {
        console.log('Response Details:', response);
        return response;
    },
    (error) => {
        console.error('Response Error:', {
            status: error.response?.status,
            data: error.response?.data,
        });
        return Promise.reject(error);
    }
);

export default apiClient;

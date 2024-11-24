import axios from 'axios';

class BaseRepository {
    constructor(endpoint = '') {
        this.baseURL = process.env.REACT_APP_BASE_URL;
        this.endpoint = endpoint;
        this.api = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Base URL:', this.baseURL);
        console.log('Endpoint:', this.endpoint);

        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('auth_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                console.log('Final Request URL:', config.baseURL + config.url);
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.api.interceptors.response.use(
            (response) => response,
            (error) => {
                console.error('API Error:', error.response || error.message);
                return Promise.reject(this.handleError(error));
            }
        );
    }

    async get(path = '', params = {}) {
        try {
            const response = await this.api.get(this.endpoint + path, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async post(path = '', data = {}) {
        try {
            const response = await this.api.post(this.endpoint + path, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    async put(path = '', data = {}) {
        try {
            const response = await this.api.put(this.endpoint + path, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete(path = '') {
        try {
            const response = await this.api.delete(this.endpoint + path);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    handleError(error) {
        if (error.response) {
            return new Error(error.response.data.message || 'Đã xảy ra lỗi từ server.');
        } else if (error.request) {
            return new Error('Không nhận được phản hồi từ server.');
        } else {
            return new Error(`Lỗi: ${error.message}`);
        }
    }
}

export default BaseRepository;

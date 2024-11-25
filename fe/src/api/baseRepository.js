import axios from 'axios';

class BaseRepository {
    constructor(endpoint) {
        this.baseURL = process.env.REACT_APP_BASE_URL;
        this.endpoint = endpoint;

        this.instance = axios.create({
            baseURL: this.baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async get(path = '', params = {}) {
        try {
            const response = await this.instance.get(`${this.endpoint}${path}`, { params });
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async post(path = '', data = {}) {
        try {
            const response = await this.instance.post(`${this.endpoint}${path}`, data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async put(path = '', data = {}) {
        try {
            const response = await this.instance.put(`${this.endpoint}${path}`, data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    async delete(path = '') {
        try {
            const response = await this.instance.delete(`${this.endpoint}${path}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    handleError(error) {
        if (error.response) {
            return new Error(error.response.data.message || 'Lỗi xảy ra từ server');
        } else if (error.request) {
            return new Error('Không nhận được phản hồi từ server');
        } else {
            return new Error(`Lỗi: ${error.message}`);
        }
    }
}

export default BaseRepository;

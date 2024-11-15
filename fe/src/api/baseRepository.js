import axios from 'axios';
import { camelToSnakeKeys } from './utils';

class BaseRepository {
    constructor(endpoint) {
        this.apiClient = axios.create({
            baseURL: `${process.env.REACT_APP_BASE_URL}${endpoint}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async get(endpoint, params = {}) {
        try {
            const response = await this.apiClient.get(endpoint, { params });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async post(endpoint, data = {}) {
        try {
            const requestData = camelToSnakeKeys(data);
            const response = await this.apiClient.post(endpoint, requestData);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async put(endpoint, data = {}) {
        try {
            const requestData = camelToSnakeKeys(data);
            const response = await this.apiClient.put(endpoint, requestData);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async delete(endpoint) {
        try {
            const response = await this.apiClient.delete(endpoint);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    handleError(error) {
        if (error.response) {
            console.error('Lỗi từ server:', error.response.data);
            throw new Error(error.response.data.message || 'Thao tác thất bại');
        } else if (error.request) {
            console.error('Không có phản hồi từ server:', error.request);
            throw new Error('Không có phản hồi từ server');
        } else {
            console.error('Lỗi không xác định:', error.message);
            throw new Error('Đã xảy ra lỗi');
        }
    }
}

export default BaseRepository;

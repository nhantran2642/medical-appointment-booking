import axios from 'axios';

class AuthRepository {
    constructor() {
        this.apiClient = axios.create({
            baseURL: 'https://medical-clinic-api.vercel.app/api/v1/auth',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async registerUser(userData) {
        try {
            const response = await this.apiClient.post('/register/', userData);
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }


    async verifyEmail(verificationCode) {
        try {
            const response = await this.apiClient.post('/verify_email/', {
                p: verificationCode,
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    async loginUser(email, password) {
        try {
            const response = await this.apiClient.post('/login/', { email, password });
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

export default new AuthRepository();

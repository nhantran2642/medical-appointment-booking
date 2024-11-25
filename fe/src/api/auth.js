import axios from 'axios';
import BaseRepository from './baseRepository';

class AuthRepository extends BaseRepository {
    constructor() {
        super('/api/v1/auth');
    }

    async registerUser(userData) {
        return this.post('/register/', userData);
    }

    async verifyEmail(verificationCode) {
        return this.post('/verify_email/?p=' + verificationCode);
    }

    async loginUser(data) {
        return this.post('/login/', data);
    }

    async verifyLoginCode(data) {
        return this.post('/login/verify_code', data);
    }

    async forgotPassword(data) {
        return this.post('/reset_password/', data);
    }

    async resetPassword(data) {
        return this.put('/password-reset-complete/', data);
    }
    async logout({ refresh }) {
        try {
            const response = await axios.post(`${this.baseUrl}/logout/`, { refresh });
            return response.data;
        } catch (err) {
            console.error('Error in logout API:', err);
            throw err;
        }
    }
   
}

export default new AuthRepository();

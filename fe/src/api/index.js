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

    async loginUser(email, password) {
        return this.post('/login/', { email, password });
    }
}

export default new AuthRepository();

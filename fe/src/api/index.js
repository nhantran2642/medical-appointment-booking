import BaseRepository from './baseRepository';

class AuthRepository extends BaseRepository {
    constructor() {
        super('/auth');
    }

    async registerUser(userData) {
        return this.post('/register/', userData);
    }

    async verifyEmail(verificationCode) {
        return this.get('/verify_email/', { p: verificationCode });
    }

    async loginUser(email, password) {
        return this.post('/login/', { email, password });
    }
}

export default new AuthRepository();

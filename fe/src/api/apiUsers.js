import BaseRepository from './baseRepository';

class UsersRepository extends BaseRepository {
    constructor() {
        super('/api/v1');
    }

    async createUser(userData) {
        try {
            return await this.post('/user/', userData);
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async getUsers(params = {}) {
        try {
            return await this.get('/user/', { params });
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }


    async getUser(userId) {
        try {
            return await this.get(`/user/${userId}`);
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }


    async updateUser(userId, userData) {
        try {
            return await this.put(`/user/${userId}/`, userData);
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }

    async patchUser(userId, userData) {
        try {
            return await this.patch(`/user/${userId}/`, userData);
        } catch (error) {
            console.error('Error patching user:', error);
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            return await this.delete(`/user/${userId}`);
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
}

export default new UsersRepository();

import BaseRepository from './baseRepository';

class UserRepository extends BaseRepository {
    constructor() {
        super('/api/v1/users');
    }

    // Lấy danh sách người dùng
    async users(data) {
        try {
            const response = await this.get('/', data);
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    // Lấy thông tin người dùng theo ID
    async getUserById(id) {
        try {
            const response = await this.get(`/${id}/`);
            console.log("response:", response);
            return response;
        } catch (error) {
            console.error(`Error fetching user with ID ${id}:`, error);
            throw error;
        }
    }

    // Tạo người dùng mới
    async createUser(data) {
        try {
            const response = await this.post('', data);
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    // Cập nhật toàn bộ thông tin người dùng theo ID
    async updateUser(id, data) {
        try {
            const response = await this.put(`/${id}/`, data);
            return response.data;
        } catch (error) {
            console.error(`Error updating user with ID ${id}:`, error);
            throw error;
        }
    }

    // Cập nhật một phần thông tin người dùng theo ID
    async patchUser(id, data) {
        try {
            const response = await this.patch(`/${id}/`, data);
            return response.data;
        } catch (error) {
            console.error(`Error partially updating user with ID ${id}:`, error);
            throw error;
        }
    }

    // Xóa người dùng theo ID
    async deleteUser(id) {
        try {
            const response = await this.delete(`/${id}/`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting user with ID ${id}:`, error);
            throw error;
        }
    }
}

export default new UserRepository();

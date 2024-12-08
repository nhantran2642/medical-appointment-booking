import axios from 'axios';
import BaseRepository from './baseRepository';

class UserRepository extends BaseRepository {
    constructor() {
        super('/api/v1/users');  // Đảm bảo URL cơ sở đúng
    }

    async getUser() {
        try {
            const response = await this.get('/'); // API trả về một mảng các đối tượng bệnh nhân
            console.log('API Response:', response);
            return response; // Trả về mảng bệnh nhân
        } catch (error) {
            console.error('API Error:', error.response || error.message);
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
}

export default UserRepository;

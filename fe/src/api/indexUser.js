import axios from 'axios';
import BaseRepository from './baseRepository';

class UserRepository extends BaseRepository {
    constructor() {
        super('/api/v1/users'); // The base URL is set here
    }

    async users(data) {
        try {
            const response = await this.get('', data); // No need to repeat the endpoint part, as '/api/v1/users' is already the base URL
            return response.data; // Ensure to return the data from the response
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error; // Re-throw the error to be handled by the caller
        }
    }
}

export default new UserRepository();

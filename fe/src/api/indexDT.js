import BaseRepository from './baseRepository';

class DoctorRepository extends BaseRepository {
    constructor() {
        super('/api/v1/doctor');
    }

    async getAllDoctors() {
        try {
            const response = await this.get('/');
            console.log('API Response:', response);
            return response;
        } catch (error) {
            console.error('API Error:', error.response || error.message);
            throw error.response?.data?.message || 'Unable to fetch doctors';
        }
    }

    async getDoctorById(doctorId) {
        try {
            const response = await this.get(`/${doctorId}`);
            return response;
        } catch (error) {
            throw error.response?.data?.message || 'Unable to fetch doctor details';
        }
    }

    async createDoctor(doctorData) {
        try {
            const response = await this.post('/', doctorData);
            return response;
        } catch (error) {
            throw error.response?.data?.message || 'Unable to create doctor';
        }
    }

    async updateDoctor(doctorId, doctorData) {
        try {
            const response = await this.put(`/${doctorId}`, doctorData);
            return response;
        } catch (error) {
            throw error.response?.data?.message || 'Unable to update doctor';
        }
    }

    async deleteDoctor(doctorId) {
        try {
            const response = await this.delete(`/${doctorId}`);
            return response;
        } catch (error) {
            throw error.response?.data?.message || 'Unable to delete doctor';
        }
    }
}

export default new DoctorRepository();

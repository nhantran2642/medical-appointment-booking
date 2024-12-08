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
            const response = await this.put(`/${doctorId}/`, doctorData);
            return response;
        } catch (error) {
            throw error.response?.data?.message || 'Unable to update doctor';
        }
    }

    async getDoctorsByUserId(userId) {
        try {
            const response = await this.get(`/get_doctor_id/?user_id=${userId}`);
            if (response && response.doctor_id) {
                return response.doctor_id; // Trả về doctor_id nếu có
            } else {
                throw new Error('Doctor ID not found in response');
            }
        } catch (error) {
            console.error('API Error:', error);  // Log lỗi nếu có
            throw error.response?.data?.message || 'Unable to fetch doctors for user';
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

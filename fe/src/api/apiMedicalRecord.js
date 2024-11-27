import BaseRepository from './baseRepository';

class MedicalRecordRepository extends BaseRepository {
    constructor() {
        super('/api/v1/medical-record');
    }

    async getAllMedical() {
        try {
            const response = await this.get('/');
            console.log('API Response:', response);
            return response;
        } catch (error) {
            console.error('API Error:', error.response || error.message);
            throw error.response?.data?.message || 'Unable to fetch medical records';
        }
    }

    async getMedicalById(medicalId) {
        try {
            const response = await this.get(`/${medicalId}`);
            return response;
        } catch (error) {
            throw error.response?.data?.message || 'Unable to fetch medical record details';
        }
    }

    async createMedical(doctorData) {
        try {
            const response = await this.post('/', doctorData);
            return response;
        } catch (error) {
            throw error.response?.data?.message || 'Unable to create medical record';
        }
    }

    async updateMedical(medicalId, medicalData) {
        try {
            const response = await this.put(`/${medicalId}`, medicalData);
            return response;
        } catch (error) {
            throw error.response?.data?.message || 'Unable to update medical record';
        }
    }

    async deleteMedical(medicalId) {
        try {
            const response = await this.delete(`/${medicalId}`);
            return response;
        } catch (error) {
            throw error.response?.data?.message || 'Unable to delete medical record';
        }
    }
}

export default new MedicalRecordRepository();
import BaseRepository from './baseRepository';

class AppointmentRepository extends BaseRepository {
    constructor() {
        super('/api/v1');
    }

  
    async createAppointment(appointmentData) {
        return this.post('/appointment/', appointmentData);
    }

  
    async getAppointments(params = {}) {
        return this.get('/appointment/', { params });
    }

 
    async getAppointmentById(appointmentId) {
        return this.get(`/appointment/${appointmentId}`);
    }
    async updateAppointment(appointmentId, appointmentData) {
        return this.put(`/appointment/${appointmentId}/`, appointmentData);
    }

    async patchAppointment(appointmentId, appointmentData) {
        return this.patch(`/appointment/${appointmentId}/`, appointmentData);
    }

    async deleteAppointment(appointmentId) {
        return this.delete(`/appointment/${appointmentId}`);
    }
}

export default new AppointmentRepository();

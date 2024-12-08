import BaseRepository from './baseRepository';

class PaymentRepository extends BaseRepository {
    constructor() {
        super('/api/v1/payment');  // Đảm bảo URL cơ sở đúng
    }

    async getPaymentReturn() {
        try {
            const response = await this.get('/vnpay_return');
            console.log('API Response:', response);
            return response;
        } catch (error) {
            console.error('API Error:', error.response || error.message);
            throw error;
        }
    }
}

export default PaymentRepository;
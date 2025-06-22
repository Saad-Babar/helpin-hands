const mockStripeInstance = {
  checkout: {
    sessions: {
      create: jest.fn().mockResolvedValue({
        id: 'cs_test_1234567890',
        url: 'https://checkout.stripe.com/pay/cs_test_1234567890'
      })
    }
  }
};

const Stripe = jest.fn(() => mockStripeInstance);

module.exports = Stripe;
module.exports.mockStripeInstance = mockStripeInstance; 
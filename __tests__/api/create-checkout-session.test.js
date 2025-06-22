// Use the manual mock for Stripe
jest.mock('stripe');
const { mockStripeInstance } = require('../../__mocks__/stripe.js');

// Mock formidable
jest.mock('formidable', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    parse: jest.fn().mockImplementation((req, callback) => {
      callback(null, {
        fields: {
          amount: ['1000'],
          currency: ['usd'],
          description: ['Test donation']
        },
        files: {}
      });
    })
  }))
}));

import { createMocks } from 'node-mocks-http'
import checkoutHandler from '../../pages/api/create-checkout-session.js'

describe('POST /api/create-checkout-session', () => {
  it('should create a checkout session successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: {
        cart: [
          {
            productName: 'Test donation',
            title: 'Test donation',
            price: 1000,
            quantity: 1
          }
        ]
      }
    });

    // Ensure the mock returns the expected sessionId and url
    mockStripeInstance.checkout.sessions.create.mockResolvedValue({
      id: 'cs_test_1234567890',
      url: 'https://checkout.stripe.com/pay/cs_test_1234567890'
    });

    await checkoutHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const responseData = JSON.parse(res._getData());
    expect(responseData).toEqual({
      success: true,
      sessionId: 'cs_test_1234567890',
      url: 'https://checkout.stripe.com/pay/cs_test_1234567890'
    });
    expect(mockStripeInstance.checkout.sessions.create).toHaveBeenCalled();
  });

  it('should handle missing cart', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: {}
    });

    await checkoutHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
    const responseData = JSON.parse(res._getData());
    expect(responseData.success).toBe(false);
    expect(responseData.error).toMatch(/cart/i);
  });

  it('should handle Stripe errors', async () => {
    mockStripeInstance.checkout.sessions.create.mockRejectedValueOnce(new Error('Stripe error'));

    const { req, res } = createMocks({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: {
        cart: [
          {
            productName: 'Test donation',
            title: 'Test donation',
            price: 1000,
            quantity: 1
          }
        ]
      }
    });

    await checkoutHandler(req, res);

    expect(res._getStatusCode()).toBe(500);
    const responseData = JSON.parse(res._getData());
    expect(responseData.success).toBe(false);
    expect(responseData.error).toMatch(/stripe/i);
  });
}); 
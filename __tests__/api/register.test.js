import { createMocks } from 'node-mocks-http'
import registerHandler from '../../pages/api/register'
import { connectToDB } from '../../lib/mongodb'
import User from '../../models/User'

// Mock dependencies
jest.mock('../../lib/mongodb')
jest.mock('../../models/User')
jest.mock('formidable')
jest.mock('uuid', () => ({
  v4: () => 'mock-uuid'
}))

// Mock formidable to simulate form parsing
jest.mock('formidable', () => {
  return jest.fn().mockImplementation(() => {
    return {
      on: function (event, callback) {
        if (event === 'field') {
          // Simulate all fields
          callback('fname', 'John');
          callback('lname', 'Doe');
          callback('email', 'john.doe@example.com');
          callback('phone', '+1234567890');
          callback('password', 'password123');
          callback('role', 'donor');
          callback('address', '123 Main St');
        }
        if (event === 'file') {
          // No file in this test
        }
        if (event === 'end') {
          callback();
        }
        if (event === 'error') {
          // No error
        }
        return this;
      },
      parse: function (req, cb) {
        cb(null, {});
      },
    };
  });
});

describe('/api/register', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('registers a new user successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fname: 'John',
        lname: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        password: 'password123',
        role: 'donor',
        address: '123 Main St',
      },
    })

    // Mock database connection
    connectToDB.mockResolvedValue()

    // Mock User.findOne (no existing user)
    User.findOne.mockResolvedValue(null)

    // Mock User.create
    const mockUser = {
      _id: 'user123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'donor',
    }
    User.create.mockResolvedValue(mockUser)

    await registerHandler(req, res)

    expect(res._getStatusCode()).toBe(201)
    expect(JSON.parse(res._getData())).toEqual({
      success: true,
      user: mockUser,
    })
  })

  test('returns error for existing email', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fname: 'John',
        lname: 'Doe',
        email: 'existing@example.com',
        phone: '+1234567890',
        password: 'password123',
        role: 'donor',
        address: '123 Main St',
      },
    })

    connectToDB.mockResolvedValue()
    User.findOne.mockResolvedValue({ email: 'existing@example.com' })

    await registerHandler(req, res)

    expect(res._getStatusCode()).toBe(409)
    expect(JSON.parse(res._getData())).toEqual({
      error: 'EMAIL_EXISTS',
      message: 'This email is already registered',
    })
  })

  test('returns error for missing fields', async () => {
    // Override formidable mock for this test only
    const formidable = require('formidable');
    formidable.mockImplementation(() => {
      return {
        on: function (event, callback) {
          if (event === 'field') {
            callback('fname', 'John'); // Only provide fname
          }
          if (event === 'end') {
            callback();
          }
          return this;
        },
        parse: function (req, cb) {
          cb(null, {});
        },
      };
    });

    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fname: 'John',
        // Missing other required fields
      },
    })

    connectToDB.mockResolvedValue()

    await registerHandler(req, res)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toEqual({
      error: 'All fields are required',
    })
  })

  test('returns error for invalid method', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    await registerHandler(req, res)

    expect(res._getStatusCode()).toBe(405)
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Method not allowed',
    })
  })
}) 
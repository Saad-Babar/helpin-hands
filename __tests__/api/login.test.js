import { createMocks } from 'node-mocks-http'
import loginHandler from '../../pages/api/login'
import { connectToDB } from '../../lib/mongodb'
import User from '../../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

jest.mock('../../lib/mongodb')
jest.mock('../../models/User')
jest.mock('bcryptjs')
jest.mock('jsonwebtoken')

describe('/api/login', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('logs in user successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    })

    connectToDB.mockResolvedValue()

    const mockUser = {
      _id: 'user123',
      email: 'test@example.com',
      password: 'hashedPassword',
      role: 'donor',
      name: 'Test User',
    }

    User.findOne.mockResolvedValue(mockUser)
    bcrypt.compare.mockResolvedValue(true)
    jwt.sign.mockReturnValue('mock-jwt-token')

    await loginHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Login successful',
    })
  })

  test('returns error for non-existent user', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'nonexistent@example.com',
        password: 'password123',
      },
    })

    connectToDB.mockResolvedValue()
    User.findOne.mockResolvedValue(null)

    await loginHandler(req, res)

    expect(res._getStatusCode()).toBe(401)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'User not found ! Please first register yourself.',
    })
  })

  test('returns error for wrong password', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test@example.com',
        password: 'wrongpassword',
      },
    })

    connectToDB.mockResolvedValue()

    const mockUser = {
      _id: 'user123',
      email: 'test@example.com',
      password: 'hashedPassword',
    }

    User.findOne.mockResolvedValue(mockUser)
    bcrypt.compare.mockResolvedValue(false)

    await loginHandler(req, res)

    expect(res._getStatusCode()).toBe(401)
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Invalid credentials',
    })
  })

  test('returns error for invalid method', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    await loginHandler(req, res)

    expect(res._getStatusCode()).toBe(405)
  })
}) 
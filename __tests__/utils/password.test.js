import bcrypt from 'bcryptjs'

describe('Password Hashing', () => {
  test('hashes password correctly', async () => {
    const password = 'testpassword123'
    const saltRounds = 10

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    expect(hashedPassword).toBeDefined()
    expect(hashedPassword).not.toBe(password)
    expect(hashedPassword.length).toBeGreaterThan(20)

    const isMatch = await bcrypt.compare(password, hashedPassword)
    expect(isMatch).toBe(true)
  })

  test('verifies password correctly', async () => {
    const password = 'testpassword123'
    const hashedPassword = await bcrypt.hash(password, 10)

    const isValid = await bcrypt.compare(password, hashedPassword)
    const isInvalid = await bcrypt.compare('wrongpassword', hashedPassword)

    expect(isValid).toBe(true)
    expect(isInvalid).toBe(false)
  })

  test('handles different salt rounds', async () => {
    const password = 'testpassword123'
    
    const hash10 = await bcrypt.hash(password, 10)
    const hash12 = await bcrypt.hash(password, 12)

    expect(hash10).not.toBe(hash12)
    
    const isValid10 = await bcrypt.compare(password, hash10)
    const isValid12 = await bcrypt.compare(password, hash12)

    expect(isValid10).toBe(true)
    expect(isValid12).toBe(true)
  })

  test('handles empty password', async () => {
    const password = ''
    const hashedPassword = await bcrypt.hash(password, 10)

    const isValid = await bcrypt.compare(password, hashedPassword)
    expect(isValid).toBe(true)
  })

  test('handles special characters in password', async () => {
    const password = 'test@#$%^&*()_+password123'
    const hashedPassword = await bcrypt.hash(password, 10)

    const isValid = await bcrypt.compare(password, hashedPassword)
    expect(isValid).toBe(true)
  })
}) 
import { AuthService } from '@bash-coffee/common'
import { PrismaService } from '@bash-coffee/line-db'
import { LineUser, Otp } from '@bash-coffee/line-db/dist/liff/client'
import { LoginArgs } from 'api/liff/public/public.dto'

import { LiffPublicService } from '../../api/liff/public/public.service'

describe('Login Test Suite', () => {
  let service: LiffPublicService
  let db: PrismaService
  let authService: AuthService

  beforeEach(() => {
    // Initialize all service and deps from backend
    db = new PrismaService()
    authService = new AuthService()
    service = new LiffPublicService(db, authService)
    jest.spyOn(authService, 'generateToken').mockReturnValue('mockToken')
  })

  // Interface-based: To test if user could login user correct mobile number and OTP
  // T1 (Not null, null)
  it('[Interface] T1: Log in success with correct mobile number and OTP', async () => {
    // default args that we will be using to handle
    const args = { phoneNumber: '0802951514', otp: '1234' } as LoginArgs

    // mock the otp object and user info
    jest.spyOn(db.otp, 'findFirst').mockResolvedValue({
      otp: '1234',
      user: {
        id: 'user-123',
        lineToken: '1234',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        points: 0,
        phoneNumber: '0802951514',
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    } as unknown as Otp)

    jest.spyOn(db.lineUser, 'update').mockResolvedValue({
      id: 'user-123',
      lineToken: '1234',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      points: 0,
      phoneNumber: '0802951514',
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as LineUser)

    const result = await service.login(args)

    expect(result).toBe('mockToken')
    expect(authService.generateToken).toHaveBeenCalledWith('user-123')
    expect(db.lineUser.update).toHaveBeenCalledWith({
      where: { id: 'user-123' },
      data: { isVerified: true },
    })
  })

  // Interface-based: To test if user would fail login with valid mobile number but invalid OTP
  // T2 (Not null, null)
  it('[Interface] T2: Fail login with valid mobile number but invalid OTP', async () => {
    const args = { phoneNumber: '0802951514', otp: '' } as LoginArgs

    jest.spyOn(db.otp, 'findFirst').mockResolvedValue(null)

    await expect(service.login(args)).rejects.toThrow('Invalid Credentials')
    expect(authService.generateToken).not.toHaveBeenCalled()
  })

  // Interface-based: To test if user would fail login with invalid mobile number but valid OTP
  // T3 (null, Not null)
  it('[Interface] T3: Fail login with invalid mobile number but valid OTP', async () => {
    const args = { phoneNumber: '', otp: '1234' } as LoginArgs

    jest.spyOn(db.otp, 'findFirst').mockResolvedValue(null)

    await expect(service.login(args)).rejects.toThrow(
      'This mobile number is not a membership',
    )
  })

  // Interface-based: To test if user would fail login with both invalid mobile number and OTP
  // T3 (null, null)
  it('[Interface] T4: Fail login with both invalid mobile number and OTP', async () => {
    const args = { phoneNumber: '', otp: '' } as LoginArgs

    jest.spyOn(db.otp, 'findFirst').mockResolvedValue(null)

    await expect(service.login(args)).rejects.toThrow('Invalid Credentials')
  })

  // Functionality-based: To test if user could login user with a valid mobile number and OTP (Based-choice)
  // T1 (valid, valid)
  it('[Functionality] T1: Log in success with valid mobile number and OTP', async () => {
    const args = { phoneNumber: '0802951514', otp: '1234' } as LoginArgs

    jest.spyOn(db.otp, 'findFirst').mockResolvedValue({
      otp: '1234',
      user: {
        id: 'user-123',
        phoneNumber: '0802951514',
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    } as unknown as Otp)

    jest.spyOn(db.lineUser, 'update').mockResolvedValue({
      id: 'user-123',
      phoneNumber: '0802951514',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as LineUser)

    const result = await service.login(args)

    expect(result).toBe('mockToken')
    expect(authService.generateToken).toHaveBeenCalledWith('user-123')
    expect(db.lineUser.update).toHaveBeenCalledWith({
      where: { id: 'user-123' },
      data: { isVerified: true },
    })
  })

  // Functionality-based: To test if user fails login with invalid OTP
  // T2: Valid Mobile Number, Invalid OTP
  it('[Functionality] T2: Fail login with valid mobile number but invalid OTP', async () => {
    const args = { phoneNumber: '0802951514', otp: '0000' } as LoginArgs

    jest.spyOn(db.otp, 'findFirst').mockResolvedValue(null)

    await expect(service.login(args)).rejects.toThrow('Invalid Credentials')
  })

  // Functionality-based: To test if user fails login with invalid credentials
  // T3: Invalid Mobile Number, Invalid OTP
  it('[Functionality] T3: Fail login with invalid mobile number and invalid OTP', async () => {
    const args = { phoneNumber: '0631984164', otp: '0000' } as LoginArgs

    jest.spyOn(db.otp, 'findFirst').mockResolvedValue(null)

    await expect(service.login(args)).rejects.toThrow('Invalid Credentials')
  })
})

import { AuthService } from '@bash-coffee/common'
import { PrismaService } from '@bash-coffee/line-db'
import { LineUser, Otp } from '@bash-coffee/line-db/dist/liff/client'
import { LoginArgs } from 'api/liff/public/public.dto'

import { LiffPublicService } from '../../api/liff/public/public.service'

describe('Register Test Suite', () => {
  let service: LiffPublicService
  let db: PrismaService
  let authService: AuthService

  beforeEach(() => {
    // Initialize all service and deps from backend
    db = new PrismaService()
    authService = new AuthService()
    service = new LiffPublicService(db, authService)
  })
    
  it
})

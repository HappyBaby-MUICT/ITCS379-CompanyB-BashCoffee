import { GetMeResponse, LoginArgs, SendOtpArgs } from './types'
import { ENDPOINT, HTTP_STATUS } from '../../libs/fetchers'

import { fetchers } from '@/libs/utils'

export const getMe = async (token: string) => {
  const res = await fetchers.Get<GetMeResponse>(
    `${ENDPOINT}/api/liff/public/me`,
    { token },
  )

  if (
    res.statusCode >= HTTP_STATUS.BAD_REQUEST ||
    res.statusCode === HTTP_STATUS.FAILED_TO_FETCH
  ) {
    throw Error(res.message)
  }

  return res.data as GetMeResponse
}

export const login = async (args: LoginArgs) => {
  const res = await fetchers.Post<string>(`${ENDPOINT}/api/liff/public/login`, {
    data: args,
  })

  if (
    res.statusCode >= HTTP_STATUS.BAD_REQUEST ||
    res.statusCode === HTTP_STATUS.FAILED_TO_FETCH
  ) {
    throw Error(res.message)
  }

  return res.data as string
}

export const sendOtp = async (args: SendOtpArgs) => { 
  console.log(args)
  const res = await fetchers.Post<string>(`${ENDPOINT}/api/liff/internal/otp/send`, {
    data: args,
  })

  if (
    res.statusCode >= HTTP_STATUS.BAD_REQUEST ||
    res.statusCode === HTTP_STATUS.FAILED_TO_FETCH
  ) {
    throw Error(res.message)
  }
}

export const verifyPhoneNumber = async (phoneNumber: string, verificationCode: string) => { 
  const res = await fetchers.Post<string>(`${ENDPOINT}/api/liff/internal/otp/verify`, {
    data: { phoneNumber, verificationCode },
  })

  if (
    res.statusCode >= HTTP_STATUS.BAD_REQUEST ||
    res.statusCode === HTTP_STATUS.FAILED_TO_FETCH
  ) {
    throw Error(res.message)
  }

  return res
}

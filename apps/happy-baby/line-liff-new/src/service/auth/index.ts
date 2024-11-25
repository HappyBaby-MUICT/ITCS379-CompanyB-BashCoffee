import { SignInResponse, getSession, signIn } from 'next-auth/react'

import {
  GetMeResponse,
  LoginArgs,
  RegisterArgs,
  SendOtpArgs,
  TransactionHistory,
  UpdateUserArgs,
} from './types'
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

export const getTrasactionHistory = async () => {
  const session = await getSession()

  const res = await fetchers.Get<TransactionHistory[]>(
    `${ENDPOINT}/api/liff/public/me/history`,
    { token: session?.user.accessToken },
  )

  if (
    res.statusCode >= HTTP_STATUS.BAD_REQUEST ||
    res.statusCode === HTTP_STATUS.FAILED_TO_FETCH
  ) {
    throw Error(res.message)
  }

  return res.data as TransactionHistory[]
}

export const loginFn = async (args: LoginArgs) => {
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

export const login = async (args: LoginArgs) => {
  const res: SignInResponse | undefined = await signIn('credentials', {
    phoneNumber: args.phoneNumber,
    otp: args.otp,
    redirect: false,
  })

  if (!res?.ok) {
    switch (res?.status) {
      case HTTP_STATUS.UNAUTHORIZED:
        throw Error('Invalid credentials')
      default:
        throw Error(res?.error as string)
    }
  }

  return res
}

export const register = async (args: RegisterArgs) => {
  const res = await fetchers.Post<string>(
    `${ENDPOINT}/api/liff/public/register`,
    { data: args },
  )

  if (
    res.statusCode >= HTTP_STATUS.BAD_REQUEST ||
    res.statusCode === HTTP_STATUS.FAILED_TO_FETCH
  ) {
    throw Error(res.message)
  }

  return res
}

export const sendOtp = async (args: SendOtpArgs) => {
  const res = await fetchers.Post<string>(
    `${ENDPOINT}/api/liff/internal/otp/send`,
    {
      data: args,
    },
  )

  if (
    res.statusCode >= HTTP_STATUS.BAD_REQUEST ||
    res.statusCode === HTTP_STATUS.FAILED_TO_FETCH
  ) {
    throw Error(res.message)
  }
}

export const verifyPhoneNumber = async (
  phoneNumber: string,
  verificationCode: string,
) => {
  const res = await fetchers.Post<string>(
    `${ENDPOINT}/api/liff/internal/otp/verify`,
    {
      data: { phoneNumber, verificationCode },
    },
  )

  if (
    res.statusCode >= HTTP_STATUS.BAD_REQUEST ||
    res.statusCode === HTTP_STATUS.FAILED_TO_FETCH
  ) {
    throw Error(res.message)
  }

  return res
}

export const updateUser = async (args: UpdateUserArgs) => {
  const session = await getSession()

  console.log({ ...args, token: session?.user.accessToken })
  const res = await fetchers.Post<string>(
    `${ENDPOINT}/api/liff/public/update`,
    { data: args, token: session?.user.accessToken },
  )

  if (
    res.statusCode >= HTTP_STATUS.BAD_REQUEST ||
    res.statusCode === HTTP_STATUS.FAILED_TO_FETCH
  ) {
    throw Error(res.message)
  }

  return res
}

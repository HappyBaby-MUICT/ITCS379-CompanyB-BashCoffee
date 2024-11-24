import { getSession } from 'next-auth/react'

import { Coupon, UserCoupon } from './types'

import { ENDPOINT, HTTP_STATUS, fetchers } from '@/libs/utils'

export const getCoupons = async () => {
  const res = await fetchers.Get<Coupon[]>(
    `${ENDPOINT}/api/liff/public/coupons/list`,
  )

  if (
    res.statusCode >= HTTP_STATUS.BAD_REQUEST ||
    res.statusCode === HTTP_STATUS.FAILED_TO_FETCH
  ) {
    throw Error(res.message)
  }

  return res.data as Coupon[]
}

export const getCoupon = async (id: string) => {
  const res = await fetchers.Get<Coupon>(
    `${ENDPOINT}/api/liff/public/coupons/${id}`,
  )

  if (
    res.statusCode >= HTTP_STATUS.BAD_REQUEST ||
    res.statusCode === HTTP_STATUS.FAILED_TO_FETCH
  ) {
    throw Error(res.message)
  }

  return res.data as Coupon
}

export const getUserCoupons = async () => {
  const session = await getSession()
  const res = await fetchers.Get<UserCoupon[]>(
    `${ENDPOINT}/api/liff/public/me/coupons`,
    {
      token: session?.user.accessToken,
    },
  )

  if (
    res.statusCode >= HTTP_STATUS.BAD_REQUEST ||
    res.statusCode === HTTP_STATUS.FAILED_TO_FETCH
  ) {
    throw Error(res.message)
  }

  return res.data as UserCoupon[]
}

export const redeemCoupon = async (id: string) => {
  const session = await getSession()
  const res = await fetchers.Post<string>(
    `${ENDPOINT}/api/liff/public/coupons/redeem`,
    {
      data: { couponId: id },
      token: session?.user.accessToken,
    },
  )

  if (
    res.statusCode >= HTTP_STATUS.BAD_REQUEST ||
    res.statusCode === HTTP_STATUS.FAILED_TO_FETCH
  ) {
    throw Error(res.message)
  }
}

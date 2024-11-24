export interface Coupon {
  id: string
  name: string
  description: string
  points: number
  imageUrl: string
  createdAt: string
  updatedAt: string
}

export interface UserCoupon { 
  id: string
  coupon: Coupon
  amount: number
  createdAt: string
  updatedAt: string
}
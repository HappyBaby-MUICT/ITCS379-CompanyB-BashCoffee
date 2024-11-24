export type LoginArgs = {
  phoneNumber: string
  otp: string
}

export type RegisterArgs = {
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
}

export type UpdateUserArgs = {
  email: string
  firstName: string
  lastName: string
}

export type SendOtpArgs = {
  phoneNumber: string
}

export type TransactionHistory = {
  id: string
  userId: string
  amount: number
  type: string
  createdAt: string
}

export type GetMeResponse = {
  id: string
  email: string
  firstname: string
  lastname: string
  points: number
  phoneNumber: string
}

export type LoginArgs = {
  phoneNumber: string
}

export type SendOtpArgs  = {
  phoneNumber: string
}

export type GetMeResponse = {
  id: string
  email: string
  firstname: string
  lastname: string
  points: number
  phoneNumber: string
}

import { useState, useRef, KeyboardEvent, ChangeEvent } from 'react'
import DefaultLayout from '@/component/DefaultLayout'
import { useRouter } from 'next/router'

export default function Verify() {
  const router = useRouter()
  const [otp, setOtp] = useState(['', '', '', ''])
  const isOtpComplete = otp.every(digit => digit !== '')
  const [isVerifying, setIsVerifying] = useState(false)
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input
      if (value && index < 3) {
        inputRefs[index + 1].current?.focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handleResend = () => {
    // Add your resend OTP logic here
    console.log('Resending OTP...')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isOtpComplete && !isVerifying) {
      setIsVerifying(true)
      const otpString = otp.join('')
      console.log('Verifying OTP:', otpString)

      try {
        // Simulate API call for OTP verification
        await new Promise(resolve => setTimeout(resolve, 1500))

        // If verification is successful, navigate to home page
        console.log('OTP verified successfully')
        router.push('/')
      } catch (error) {
        console.error('OTP verification failed:', error)
        // Handle verification failure (e.g., show error message)
      } finally {
        setIsVerifying(false)
      }
    }
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center w-full gap-2">
        <h1 className="text-xl font-bold text-[#2D1810] mt-4">
          Enter OTP code sent to
        </h1>
        <h2 className="text-xl text-[#2D1810] mb-4">xxx-xxx-xxxx</h2>
        <form onSubmit={handleSubmit} className="w-full space-y-8">
          <div className="grid grid-cols-4 gap-4">
            {otp.map((digit, index) => (
              <div key={index} className="relative pb-[100%]">
                <input
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(index, e.target.value)
                  }
                  onKeyDown={e => handleKeyDown(index, e)}
                  className="absolute inset-0 w-full h-full text-center text-2xl bg-white rounded-xl border-0 shadow-sm"
                  aria-label={`Digit ${index + 1}`}
                  required
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 items-center justify-center">
            <p className="text-sm">Didn't get OTP code? </p>
            <button
              type="button"
              onClick={handleResend}
              className="text-center text-[#846546] hover:underline font-bold"
            >
              Resend
            </button>
          </div>
          <button
            type="submit"
            className={`text-white w-full bg-[#2D1810] hover:bg-[#2D1810]/80 font-semibold rounded-lg text-sm py-3 mb-2 mt-4${
              isOtpComplete && !isVerifying
                ? ''
                : 'cursor-not-allowed'
            }`}
          >
            {isVerifying ? 'VERIFYING...' : 'VERIFY OTP'}
          </button>
        </form>
      </div>
    </DefaultLayout>
  )
}

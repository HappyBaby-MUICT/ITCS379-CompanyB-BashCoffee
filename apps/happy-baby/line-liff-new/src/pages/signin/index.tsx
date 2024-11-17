import { useRouter } from 'next/router'
import { useState } from 'react'
import DefaultLayout from '@/component/DefaultLayout'

export default function Signin() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const router = useRouter()

  // Function to format phone number
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '') // Remove non-numeric characters
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
    if (!match) return value
    const formatted = [match[1], match[2], match[3]].filter(Boolean).join('-')
    return formatted
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Prevent form submission
    if (phoneNumber.match(/^\d{3}-\d{3}-\d{4}$/)) {
      router.push('/signin/verify') // Redirect to home page
    } else {
      alert('Please enter a valid phone number in the format xxx-xxx-xxxx.')
    }
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center w-full gap-8">
        {/* Title and Welcome Text */}
        <div className="flex flex-col items-center gap-2 w-full">
          <p className="font-bold text-xl text-center text-[#4F3A32]">
            SIGN IN
          </p>
          <p className="text-sm text-center text-[#17181A]">
            Welcome to Bash Coffee Membership!
          </p>
        </div>

        {/* Form */}
        <form className="w-full mx-auto" onSubmit={handleSubmit}>
          <label className="block mb-3 text-sm font-semibold">
            Phone number
          </label>
          <input
            type="text"
            id="phone-input"
            aria-describedby="helper-text-explanation"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="xxx-xxx-xxxx"
            value={phoneNumber}
            onChange={handleInputChange}
            required
          />
          <button
            type="submit"
            className="text-white w-full bg-[#2D1810] hover:bg-[#2D1810]/80 font-semibold rounded-lg text-sm py-3 mb-2 mt-4"
          >
            SIGN IN
          </button>
        </form>

        {/* Sign Up Link */}
        <span className="text-right w-full">
          <span className="text-sm">Don't Have an Account? </span>
          <a href="/signup" className="text-sm font-semibold text-[#846546]">
            Sign up
          </a>
        </span>
      </div>
    </DefaultLayout>
  )
}

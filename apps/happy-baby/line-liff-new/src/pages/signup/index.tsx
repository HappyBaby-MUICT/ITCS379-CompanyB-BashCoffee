import DefaultLayout from '@/component/DefaultLayout'
import { useRouter } from 'next/router'

export default function Signup() {
  const router = useRouter()

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // Prevent default form submission
    router.push('/signup/verify') // Navigate to the OTP verification page
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center w-full gap-8">
        <div className="flex flex-col items-center gap-2 w-full">
          <p className=" font-bold text-xl text-center text-[#4F3A32]">
            SIGN UP
          </p>
          <p className=" text-sm text-center text-[#17181A]">
            Let&apos;s be one of bash members!
          </p>
        </div>

        <form className="w-full mx-auto">
          <label className="block mb-3 text-sm font-semibold">Email</label>
          <input
            type="email"
            id="email"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="user@email.com"
            required
          />
          <label className="block my-3 text-sm font-semibold">
            Phone number
          </label>
          <input
            type="tel"
            id="phonenumber"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="xxx-xxx-xxxx"
            required
          />
          <label className="block my-3 text-sm font-semibold">First name</label>
          <input
            type="text"
            id="firstname"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="first name"
            required
          />
          <label className="block my-3 text-sm font-semibold">Last name</label>
          <input
            type="text"
            id="lastname"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="last name"
            required
          />
          <button
            type="submit"
            onClick={handleSignUp}
            className="text-white w-full bg-[#2D1810] hover:bg-[#2D1810]/80 font-semibold rounded-lg text-sm py-3 mb-2 mt-4"
          >
            SIGN UP
          </button>
        </form>
        <span className="text-right w-full mt-[-4]">
          <span className="text-sm">Already Have an Account? </span>
          <a href="/signin" className="text-sm font-semibold text-[#846546]">
            Sign in
          </a>
        </span>
      </div>
    </DefaultLayout>
  )
}

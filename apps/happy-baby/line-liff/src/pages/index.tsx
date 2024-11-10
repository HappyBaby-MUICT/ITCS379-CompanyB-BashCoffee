import DefaultLayout from '@/component/DefaultLayout'

export default function Home() {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center w-full h-full gap-8">
        <div className="flex flex-col items-center gap-2 w-full">
          <p className=" font-bold text-xl text-center text-[#4F3A32]">
            SIGN IN
          </p>
          <p className=" text-sm text-center text-[#17181A]">
            Welcome to Bash Coffee Membership!
          </p>
        </div>

        <form className="w-full mx-auto">
          <label className="block mb-3 text-sm font-semibold">
            Phone number
          </label>
          <input
            type="text"
            id="phone-input"
            aria-describedby="helper-text-explanation"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            placeholder="123-456-7890"
            required
          />
          <button
            type="submit"
            className="text-white w-full bg-[#4F3A32] font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4"
          >
            SIGN IN
          </button>
        </form>
        <span className="text-right w-full mt-[-4]">
          <span className="text-sm">Don't Have an Account? </span>
          <a href="/signup" className="text-sm font-semibold text-[#846546]">
            Sign up
          </a>
        </span>
      </div>
    </DefaultLayout>
  )
}

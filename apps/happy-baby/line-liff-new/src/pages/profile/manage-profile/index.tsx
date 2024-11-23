import { useState } from 'react'
import MembershipLayout from '@/component/MembershipLayout'
import { FaUserPen } from 'react-icons/fa6'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'

export default function Profile() {
  const [formData, setFormData] = useState({
    email: 'ictbashcoffee303@gmail.com',
    firstName: 'Bash',
    lastName: 'Coffee',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData)
    // Here you would typically send the data to your backend
  }

  return (
    <MembershipLayout>
      <div className="flex flex-col items-center w-full gap-8">
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex gap-2 items-center justify-between my-2 w-full">
            <Link href="/profile">
              <IoArrowBack size={24} color="#AB9064" />
            </Link>
            <div className="flex gap-2 items-center my-2">
              <FaUserPen size={20} />
              <p className=" font-bold text-md">Profile</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <label className="block mb-3 text-sm font-semibold">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="user@email.com"
              required
            />
            <label className="block my-3 text-sm font-semibold">
              First name
            </label>
            <input
              type="text"
              id="firstname"
              value={formData.firstName}
              onChange={handleChange}
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="first name"
              required
            />
            <label className="block my-3 text-sm font-semibold">
              Last name
            </label>
            <input
              type="text"
              id="lastname"
              value={formData.lastName}
              onChange={handleChange}
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="last name"
              required
            />
            <button
              type="submit"
              className="text-white w-full bg-[#2D1810] hover:bg-[#2D1810]/80 font-semibold rounded-lg text-sm py-3 mb-2 mt-4"
            >
              SAVE CHANGE
            </button>
          </form>
        </div>
      </div>
    </MembershipLayout>
  )
}

import MembershipLayout from '@/component/MembershipLayout'
import { CgProfile } from 'react-icons/cg'
import { GrNext } from 'react-icons/gr'
import { MdOutlineRedeem } from 'react-icons/md'
import { RiHistoryFill } from 'react-icons/ri'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RiCoupon2Line } from 'react-icons/ri'

export default function Home() {
  const router = useRouter()

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // Prevent default form submission
    router.push('/signin') // Navigate to the OTP verification page
  }

  return (
    <MembershipLayout>
      <div className="flex flex-col items-center w-full gap-8">
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex flex-col w-full mt-4 gap-4">
            {/* Account Management */}
            <div className="flex flex-col w-full gap-2">
              <p className="text-md font-semibold uppercase text-[#2E1F1A]">
                Account Management
              </p>
              <Link href="/profile">
                <div className="flex w-full items-center justify-between bg-[#BDAA84] rounded-md p-4 gap-4 cursor-pointer">
                  <div className="flex gap-2">
                    <CgProfile size={24} />
                    <p className="text-md">Profile</p>
                  </div>
                  <GrNext color="#5D4336" />
                </div>
              </Link>
            </div>

            {/* Membership Privilege */}
            <div className="flex flex-col w-full gap-2">
              <p className="text-md font-semibold uppercase text-[#2E1F1A]">
                Membership Privilege
              </p>
              <Link href="/point-redemption">
                <div className="flex w-full items-center justify-between bg-[#BDAA84] rounded-md p-4 gap-4 cursor-pointer">
                  <div className="flex gap-2">
                    <MdOutlineRedeem size={24} />
                    <p className="text-md">Point Redemption</p>
                  </div>
                  <GrNext color="#5D4336" />
                </div>
              </Link>
              <Link href="/mycoupon">
                <div className="flex w-full items-center justify-between bg-[#BDAA84] rounded-md p-4 gap-4 cursor-pointer">
                  <div className="flex gap-2">
                    <RiCoupon2Line size={24} />
                    <p className="text-md">My Coupon</p>
                  </div>
                  <GrNext color="#5D4336" />
                </div>
              </Link>
            </div>

            {/* History */}
            <div className="flex flex-col w-full gap-2">
              <p className="text-md font-semibold uppercase text-[#2E1F1A]">
                History
              </p>
              <Link href="/point-history">
                <div className="flex w-full items-center justify-between bg-[#BDAA84] rounded-md p-4 gap-4 cursor-pointer">
                  <div className="flex gap-2">
                    <RiHistoryFill size={24} />
                    <p className="text-md">Point History</p>
                  </div>
                  <GrNext color="#5D4336" />
                </div>
              </Link>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleLogout}
            className="text-white w-full bg-[#2D1810] hover:bg-[#2D1810]/80 font-semibold rounded-lg text-sm py-3 mb-2 mt-4"
          >
            LOG OUT
          </button>
        </div>
      </div>
    </MembershipLayout>
  )
}

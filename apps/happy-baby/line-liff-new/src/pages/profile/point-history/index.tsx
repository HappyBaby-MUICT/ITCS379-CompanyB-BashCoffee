import MembershipLayout from '@/component/MembershipLayout'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'
import { RiHistoryFill } from 'react-icons/ri'

export default function PointHistory() {
  return (
    <MembershipLayout>
      <div className="flex flex-col items-center w-full gap-8">
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex gap-2 items-center justify-between my-2 w-full">
            <Link href="/profile">
              <IoArrowBack size={24} color="#AB9064" />
            </Link>
            <div className="flex gap-2 items-center my-2">
              <RiHistoryFill size={20} />
              <p className=" font-bold text-md">Point History</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full bg-[#D5CBB1] p-4 rounded-xl mb-2">
            <div className="flex items-center w-full justify-between">
              <p className="text-lg text-[#2D1810]">Point Redeemed</p>
              <p className="text-lg text-[#2D1810]">- 10</p>
            </div>
            <p className="text-sm text-[#454648]">18/11/2024 7:00</p>
          </div>
          <div className="flex flex-col gap-1 w-full bg-[#D5CBB1] p-4 rounded-xl mb-2">
            <div className="flex items-center w-full justify-between">
              <p className="text-lg text-[#2D1810]">Point Collected</p>
              <p className="text-lg text-[#2D1810]">+ 2</p>
            </div>
            <p className="text-sm text-[#454648]">17/11/2024 9:00</p>
          </div>
          <p className="text-lg text-[#454648] my-2">
            No Point Redeemed or Collected!
          </p>
        </div>
      </div>
    </MembershipLayout>
  )
}

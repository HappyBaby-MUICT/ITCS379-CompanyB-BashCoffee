import HistoryCard from '@/component/history/HistoryCard'
import MembershipLayout from '@/component/MembershipLayout'
import { SimpleSpinner } from '@/component/shared/Spinner'
import { getTrasactionHistory } from '@/service/auth'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'
import { RiHistoryFill } from 'react-icons/ri'

export default function PointHistory() {
  const { data, isLoading } = useQuery(['point-history'], getTrasactionHistory)

  return (
    <MembershipLayout>
      <div className="flex flex-col items-center w-full gap-8">
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex gap-2 items-center justify-between my-2 w-full">
            <Link href="/home">
              <IoArrowBack size={24} color="#AB9064" />
            </Link>
            <div className="flex gap-2 items-center my-2">
              <RiHistoryFill size={20} />
              <p className=" font-bold text-md">Point History</p>
            </div>
          </div>
          {isLoading ? (
            <SimpleSpinner />
          ) : data && data.length > 0 ? (
            data.map((history, index) => (
              <HistoryCard key={index} {...history} />
            ))
          ) : (
            <p className="text-lg text-[#454648] my-2">
              No Point Redeemed or Collected!
            </p>
          )}
        </div>
      </div>
    </MembershipLayout>
  )
}

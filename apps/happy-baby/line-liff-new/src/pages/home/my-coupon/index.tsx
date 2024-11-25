import Coupon from '@/component/coupons/Coupon'
import MembershipLayout from '@/component/MembershipLayout'
import { SimpleSpinner } from '@/component/shared/Spinner'
import { getUserCoupons } from '@/service/coupon'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'
import { RiCoupon2Line } from 'react-icons/ri'

export default function MyCoupon() {
  const { data, isLoading } = useQuery(['coupons-get-'], getUserCoupons)

  return (
    <MembershipLayout>
      <div className="flex flex-col items-center w-full gap-8">
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex gap-2 items-center justify-between my-2 w-full">
            <Link href="/home">
              <IoArrowBack size={24} color="#AB9064" />
            </Link>
            <div className="flex gap-2 items-center my-2">
              <RiCoupon2Line size={20} />
              <p className=" font-bold text-md">My Coupon</p>
            </div>
          </div>
          {isLoading ? (
            <SimpleSpinner />
          ) : data && data.length > 0 ? (
            data.map((history, index) => <Coupon key={index} {...history} />)
          ) : (
            <p className="text-lg text-[#454648] my-2">
              No redeemed coupon here!
            </p>
          )}
        </div>
      </div>
    </MembershipLayout>
  )
}

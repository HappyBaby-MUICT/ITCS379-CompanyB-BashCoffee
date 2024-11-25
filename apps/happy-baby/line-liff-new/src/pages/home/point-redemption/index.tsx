import MembershipLayout from '@/component/MembershipLayout'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'
import { IoIosGift } from 'react-icons/io'
import { useQuery } from '@tanstack/react-query'
import { getCoupons } from '@/service/coupon'
import CouponCard from '@/component/coupons/CouponCard'
import { SimpleSpinner } from '@/component/shared/Spinner'

export default function PointRedemption() {
  const { data, isLoading } = useQuery(['coupons-get'], getCoupons)

  return (
    <MembershipLayout>
      <div className="flex flex-col items-center w-full gap-8">
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex gap-2 items-center justify-between my-2 w-full">
            <Link href="/home">
              <IoArrowBack size={24} color="#AB9064" />
            </Link>
            <div className="flex gap-2 items-center my-2">
              <IoIosGift size={20} />
              <p className=" font-bold text-md">Point Redemption</p>
            </div>
          </div>
          {isLoading ? (
            <SimpleSpinner />
          ) : (
            data?.map(coupon => <CouponCard key={coupon.id} {...coupon} />)
          )}
        </div>
      </div>
    </MembershipLayout>
  )
}

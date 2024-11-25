import MembershipLayout from '@/component/MembershipLayout'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'
import { IoIosGift } from 'react-icons/io'
import { useQuery } from '@tanstack/react-query'
import { getUserCoupon } from '@/service/coupon'
import { useRouter } from 'next/router'
import { SimpleSpinner } from '@/component/shared/Spinner'
import Coupon from '@/component/coupons/Coupon'

export default function CouponPage() {
  const router = useRouter()

  const couponId = router.query.id as string
  const { data, isLoading } = useQuery(['coupons-get-me-'], () => {
    return getUserCoupon(couponId)
  })

  if (!isLoading && router.isReady) {
    console.log(router.query.id)
  }

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
          {isLoading || !router.isReady ? (
            <SimpleSpinner />
          ) : (
            data && <Coupon {...data} />
          )}
        </div>
      </div>
    </MembershipLayout>
  )
}

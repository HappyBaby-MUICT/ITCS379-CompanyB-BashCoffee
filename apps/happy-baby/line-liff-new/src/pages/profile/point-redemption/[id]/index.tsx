import MembershipLayout from '@/component/MembershipLayout'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'
import { IoIosGift } from 'react-icons/io'
import { TbParkingCircleFilled } from 'react-icons/tb'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { getCoupon, redeemCoupon } from '@/service/coupon'
import { SimpleSpinner } from '@/component/shared/Spinner'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

export default function PointRedemptionID() {
  const router = useRouter()
  const { update } = useSession()

  const couponId = router.query.id as string
  const { data, isLoading } = useQuery(['coupons-get-', couponId], () =>
    getCoupon(couponId),
  )
  const handleRedeem = useMutation(redeemCoupon)

  const onClick = async () => {
    try {
      await handleRedeem.mutateAsync(couponId)
      toast.success('Successfully redeemed coupon')
      update()
      router.push('/profile')
    } catch (e) {
      console.error(e)
      toast.error('Failed to redeem coupon')
    }
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
              <IoIosGift size={20} />
              <p className=" font-bold text-md">Point Redemption</p>
            </div>
          </div>
          {isLoading || !router.isReady ? (
            <SimpleSpinner />
          ) : (
            <div className="flex flex-col gap-4 w-full bg-[#D5CBB1] p-4 rounded-xl">
              <div className="flex flex-col gap- w-full">
                <div className="relative w-full rounded-xl overflow-hidden aspect-[16/9]">
                  <img
                    src={data?.imageUrl}
                    alt="pointredeempic"
                    className="object-cover"
                  />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-lg font-bold text-[#2D1810]">
                    {data?.name}
                  </p>
                  <div className="flex gap-2 px-1 bg-[#E9E5D7] w-fit rounded-md items-center">
                    <p className="text-lg text-[#2D1810]">{data?.points}</p>
                    <TbParkingCircleFilled size={24} />
                  </div>
                </div>
                <p className="text-md font-bold text-[#2D1810] mt-2">
                  Condition
                </p>
                <ul className="list-disc text-sm text-[#2D1810] ml-5 space-y-1">
                  {data?.description
                    .split('\n')
                    .map((line, index) => <li key={index}>{line}</li>)}
                </ul>
              </div>
              <button
                type="button"
                onClick={onClick}
                className="text-white w-full bg-[#2D1810] hover:bg-[#2D1810]/80 font-semibold rounded-lg text-sm py-3 mb-2 mt-4"
              >
                REDEEM NOW
              </button>
            </div>
          )}
        </div>
      </div>
    </MembershipLayout>
  )
}

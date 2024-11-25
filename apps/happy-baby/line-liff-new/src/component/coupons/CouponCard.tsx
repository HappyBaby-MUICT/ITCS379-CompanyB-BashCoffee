import { Coupon } from '@/service/coupon/types'
import Link from 'next/link'
import { TbParkingCircleFilled } from 'react-icons/tb'

type CouponCardProps = Coupon

const CouponCard = (props: CouponCardProps) => {
  return (
    <Link href={`/home/point-redemption/${props.id}`}>
      <div className="flex flex-col gap-4 w-full bg-[#D5CBB1] p-4 rounded-xl">
        <div className="flex flex-col gap- w-full">
          <div className="relative w-full rounded-xl overflow-hidden aspect-[16/9]">
            <img
              src={props.imageUrl}
              alt="pointredeempic"
              className="object-cover"
            />
          </div>
          <div className="flex justify-between items-center  mt-4">
            <p className="text-lg font-bold text-[#2D1810]">{props.name}</p>
            <div className="flex gap-2 px-1 bg-[#E9E5D7] w-fit rounded-md items-center">
              <p className="text-lg text-[#2D1810]">10</p>
              <TbParkingCircleFilled size={24} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CouponCard

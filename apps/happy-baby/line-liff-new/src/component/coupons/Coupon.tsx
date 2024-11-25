import { Button } from '@/modules/ui/button'
import { Coupon as ICoupon } from '@/service/coupon/types'
import { toast } from 'sonner'

type CouponProps = {
  id: string
  coupon: ICoupon
}

const Coupon = (props: CouponProps) => {
  return (
    <div className="flex flex-col gap-4 w-full bg-[#D5CBB1] p-4 rounded-xl mb-2">
      <div className="flex flex-col gap- w-full">
        <div className="relative w-full rounded-xl overflow-hidden aspect-[16/9]">
          <img
            src={props.coupon.imageUrl}
            alt="pointredeempic"
            className="object-cover"
          />
        </div>
        <p className="text-lg font-bold text-[#2D1810] mt-4 mb-2">
          {props.coupon.name}
        </p>
        <p className="text-md font-bold text-[#2D1810]">Condition</p>
        <ul>
          {props.coupon.description.split('\n').map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
        <p className="coupon-code text-3xl text-center font-bold text-[#2D1810] mt-4">
          {props.id.substring(14, 20).toLocaleUpperCase()}
        </p>
      </div>
      <Button
        className="text-white w-full bg-[#2D1810] hover:bg-[#2D1810]/80 font-semibold rounded-lg text-sm py-3 mb-2 mt-2"
        onClick={() => {
          navigator.clipboard.writeText(
            props.id.substring(14, 20).toLocaleUpperCase(),
          )
          toast.success('Coupon code copied')
        }}
      >
        COPY CODE
      </Button>
    </div>
  )
}

export default Coupon

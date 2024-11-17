import { useState } from 'react'
import MembershipLayout from '@/component/MembershipLayout'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'
import { IoIosGift } from 'react-icons/io'
import { TbParkingCircleFilled } from 'react-icons/tb'
import { useRouter } from 'next/router'

export default function PointRedemptionID() {
  const router = useRouter()

  return (
    <MembershipLayout>
      <div className="flex flex-col items-center w-full gap-8">
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex gap-2 items-center justify-between my-2 w-full">
            <Link href="/point-redemption">
              <IoArrowBack size={24} color="#AB9064" />
            </Link>
            <div className="flex gap-2 items-center my-2">
              <IoIosGift size={20} />
              <p className=" font-bold text-md">Point Redemption</p>
            </div>
          </div>
          <Link href="/point-redemption/1">
            <div className="flex flex-col gap-4 w-full bg-[#D5CBB1] p-4 rounded-xl">
              <div className="flex flex-col gap- w-full">
                <div className="relative w-full rounded-xl overflow-hidden aspect-[16/9]">
                  <img
                    src="../redeemitem.jpg"
                    alt="pointredeempic"
                    className="object-cover"
                  />
                </div>
                <p className="text-lg font-bold text-[#2D1810] my-2">
                  A Free Drink on Us
                </p>
                <p className="text-md font-bold text-[#2D1810]">
                  Condition
                </p>
                <ul className="list-disc text-sm text-[#2D1810] ml-5 space-y-1">
                  <li>The add-on isn't included.</li>
                  <li>This coupon can be used in online order and at Bash Coffee.</li>
                </ul>
                <p className="text-3xl text-center font-bold text-[#2D1810] mt-4">
                  143280
                </p>
              </div>
              <button
                type="submit"
                className="text-white w-full bg-[#2D1810] hover:bg-[#2D1810]/80 font-semibold rounded-lg text-sm py-3 mb-2 mt-2"
              >
                COPY CODE
              </button>
            </div>
          </Link>
        </div>
      </div>
    </MembershipLayout>
  )
}

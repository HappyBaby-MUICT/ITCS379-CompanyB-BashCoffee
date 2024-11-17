import { useState } from 'react'
import MembershipLayout from '@/component/MembershipLayout'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'
import { IoIosGift } from 'react-icons/io'

export default function PointRedemption() {
  return (
    <MembershipLayout>
      <div className="flex flex-col items-center w-full gap-8">
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex gap-2 items-center justify-between my-2 w-full">
            <Link href="/">
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
                    src="./redeemitem.jpg"
                    alt="pointredeempic"
                    className="object-cover"
                  />
                </div>
                <p className="text-lg font-bold text-[#2D1810] mt-2">
                  A Free Drink on Us
                </p>
                <p className="text-lg text-[#2D1810]">10 Points</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </MembershipLayout>
  )
}

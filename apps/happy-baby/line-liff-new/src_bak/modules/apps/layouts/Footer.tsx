import { Envelope, Phone } from '@phosphor-icons/react'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import { cn } from '@/libs/utils'

export const Footer = () => {
  return (
    <footer className="footer">
      <div className={cn(['flex-col bg-cream text-primary', 'h-auto', 'fi'])}>
        <div className="mb-4 mt-6 grid grid-cols-1 items-center justify-center gap-4 font-medium md:grid-cols-4 md:gap-20">
          <div className="flex-col items-center justify-center p-4">
            <img src="/perfect_skill.png" alt="Logo" className="h-18" />
          </div>
          <div className="flex flex-col space-y-4">
            <p>หน้าแรก</p>
            <p>การเรียนรู้ของฉัน</p>
          </div>
          <div className="flex flex-col space-y-2">
            <p>ข้อกำหนด</p>
            <p>นโยบายความเป็นส่วนตัว</p>
            <p>การตั้งค่าคุกกี้</p>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <Envelope size={24} />
              <p>contact@company.com</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={24} />
              <p>(414) 687 - 5892</p>
            </div>
          </div>
        </div>
        <hr className="my-8 w-[95%] rounded border-[0.5px] border-footer-divider" />
        <div className="container mb-8">
          <div className="fi flex-col justify-between gap-4 md:flex-row md:gap-0">
            <p className="text-subtitle text-xs font-medium md:text-sm">
              Copyright © 2024 Perfect Computer Solution
            </p>
            <div className="flex gap-4">
              <Link href="https://www.facebook.com">
                <FaFacebookF className="h-6 w-6 text-icons" />
              </Link>
              <Link href="https://www.twitter.com">
                <FaXTwitter className="h-6 w-6 text-icons" />
              </Link>
              <Link href="https://www.instagram.com">
                <FaInstagram className="h-6 w-6 text-icons" />
              </Link>
              <Link href="https://www.youtube.com">
                <FaYoutube className="h-6 w-6 text-icons" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

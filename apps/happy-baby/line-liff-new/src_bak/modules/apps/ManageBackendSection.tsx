import {
  IoSettings,
  IoMailUnread,
  IoPerson,
  IoRibbon,
  IoFileTrayFull,
  IoChatbubbles,
  IoFileTrayStacked,
} from 'react-icons/io5'

import MySwiper from '@/modules/ui/MySwiper'

export const ManageBackendSection = () => {
  return (
    <div className="flex flex-col items-center p-4 md:flex-row md:justify-between">
      <div className="mb-4 mt-4 flex md:mb-0 md:ml-4 md:mt-0">
        <MySwiper
          images={[
            'feature/backend1.png',
            'feature/backend2.png',
            'feature/backend3.png',
          ]}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-start text-3xl font-bold md:text-end">
          ระบบจัดการหลังบ้าน
        </div>
        <div className="flex flex-col gap-2 text-start md:text-end">
          <div className="text-custom-black">
            บริหารจัดการผู้ใช้และกำหนดบทบาทได้อย่างง่ายดาย
            พร้อมทั้งควบคุมการเข้าถึงเนื้อหา
          </div>
          <div className="text-custom-black">
            และฟีเจอร์ต่าง ๆ
            พร้อมทั้งปรับแต่งและออกแบบหน้าตาเว็บไซต์ได้ตามต้องการ
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center">
            <IoSettings className="text-icons" />
            <span className="ml-2">ระบบการจัดการเว็บไซต์</span>
          </div>
          <div className="flex items-center">
            <IoPerson className="text-icons" />
            <span className="ml-2">ระบบการข้อมูลผู้ใช้</span>
          </div>
          <div className="flex items-center">
            <IoFileTrayStacked className="text-icons" />
            <span className="ml-2">ระบบการจัดการการบ้านและการสอบ</span>
          </div>
          <div className="flex items-center">
            <IoRibbon className="text-icons" />
            <span className="ml-2">ระบบการจัดการของรางวัล</span>
          </div>
          <div className="flex items-center">
            <IoMailUnread className="text-icons" />
            <span className="ml-2">ระบบการจัดการกิจกรรมและข่าวสาร</span>
          </div>
          <div className="flex items-center">
            <IoFileTrayFull className="text-icons" />
            <span className="ml-2">ระบบการจัดการข้อมูลหลักสูตร</span>
          </div>
          <div className="flex items-center">
            <IoChatbubbles className="text-icons" />
            <span className="ml-2">ระบบตอบโต้กับผู้เรียน</span>
          </div>
        </div>
      </div>
    </div>
  )
}

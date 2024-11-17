import {
  IoBook,
  IoClipboard,
  IoRibbon,
  IoSchool,
  IoAnalytics,
  IoNewspaper,
} from 'react-icons/io5'

import MySwiper from '@/modules/ui/MySwiper'

export const ManageClassSection = () => {
  return (
    <div className="flex flex-col items-center p-6 md:flex-row md:justify-between">
      <div className="mb-4 mt-4 flex md:mb-0 md:ml-4 md:mt-0">
        <MySwiper
          images={[
            'feature/student1.png',
            'feature/student2.png',
            'feature/student3.png',
          ]}
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-start text-3xl font-bold md:text-end">
          ระบบจัดการการเรียน
        </div>
        <div className="flex flex-col gap-2 text-start md:text-end">
          <div className="text-custom-black">
            มอบประสบการณ์การเรียนรู้ที่ครอบคลุมและมีประสิทธิภาพ
          </div>
          <div className="text-custom-black">
            ด้วยระบบการจัดการที่ใช้งานง่ายและตอบโจทย์ความต้องการของผู้เรียนและองค์กร
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center">
            <IoBook className="text-icons" />
            <span className="ml-2">รองรับการเรียนบนทุกแพลตฟอร์ม</span>
          </div>
          <div className="flex items-center">
            <IoSchool className="text-icons" />
            <span className="ml-2">การจัดเก็บและแสดงเกียรติบัตร</span>
          </div>
          <div className="flex items-center">
            <IoClipboard className="text-icons" />
            <span className="ml-2">การประเมินภาพรวมการเรียนรู้</span>
          </div>
          <div className="flex items-center">
            <IoAnalytics className="text-icons" />
            <span className="ml-2">การติดตามความคืบหน้าของหลักสูตร</span>
          </div>
          <div className="flex items-center">
            <IoRibbon className="text-icons" />
            <span className="ml-2">ระบบการแลกรางวัลสำหรับผู้เรียน</span>
          </div>
          <div className="flex items-center">
            <IoNewspaper className="text-icons" />
            <span className="ml-2">การทดสอบและวัดผลการเรียนรู้</span>
          </div>
        </div>
      </div>
    </div>
  )
}

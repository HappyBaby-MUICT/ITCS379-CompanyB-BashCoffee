import {
  IoFileTrayFull,
  IoFileTrayStacked,
  IoPrint,
  IoChatbubbles,
} from 'react-icons/io5'

import MySwiper from '@/modules/ui/MySwiper'

export const ManageTeacherSection = () => {
  return (
    <div className="flex flex-col items-center p-4 md:flex-row md:justify-between">
      <div className="order-0 mb-4 md:order-1 md:mb-0 md:mr-4 ">
        <MySwiper
          images={[
            'feature/teacher1.png',
            'feature/teacher2.png',
            'feature/teacher3.png',
          ]}
        />
      </div>
      <div>
        <div className="md:order-0 order-1 flex flex-col gap-4 md:w-auto">
          <div className="text-start text-3xl font-bold">
            ระบบจัดการสำหรับวิทยากร
          </div>
          <div className="flex flex-col gap-2 text-start">
            <div className="text-custom-black">
              เพิ่มประสิทธิภาพในการสอนด้วยฟีเจอร์ที่ครอบคลุมและการบริหารจัดการหลักสูตรได้อย่างง่ายดาย
            </div>
            <div className="text-custom-black">
              สร้างสรรค์การสอนด้วยเครื่องมือที่ทันสมัยและใช้งานง่าย
              เพื่อผลักดันศักยภาพของผู้เรียน
            </div>
          </div>
          <div className="mt-0 grid grid-cols-1 gap-4 md:mt-4 md:grid-cols-2">
            <div className="flex items-center">
              <IoFileTrayFull className="text-icons" />
              <span className="ml-2">ระบบการจัดการหลักสูตร</span>
            </div>
            <div className="flex items-center">
              <IoFileTrayStacked className="text-icons" />
              <span className="ml-2">การจัดเก็บและแสดงเกียรติบัตร</span>
            </div>
            <div className="flex items-center">
              <IoPrint className="text-icons" />
              <span className="ml-2">การสร้างประกาศนียบัตร</span>
            </div>
            <div className="flex items-center">
              <IoChatbubbles className="text-icons" />
              <span className="ml-2">ระบบถาม-ตอบกับผู้เรียน</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

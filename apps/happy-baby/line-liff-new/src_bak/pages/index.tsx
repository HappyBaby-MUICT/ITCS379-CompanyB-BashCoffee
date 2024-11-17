import { useState } from 'react'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { IoChatbubbleEllipses, IoEarth, IoLibrary } from 'react-icons/io5'
import { PiStudentBold } from 'react-icons/pi'
import { Element } from 'react-scroll'

import { packageLists } from '@/constants/package'
import { ContactUsForm } from '@/modules/apps/ContactUsForm'
import { FeatureCard } from '@/modules/apps/FeatureCard'
import { PackageCard } from '@/modules/apps/PackageCard'
import { ReviewCard } from '@/modules/apps/ReviewCard'
import { StatsCard } from '@/modules/apps/StudentCountBanner'
import { TitleWithMarquee } from '@/modules/apps/TitleWithMarquee'
import { Layout } from '@/modules/apps/layouts/Layout'
import { PageTitle } from '@/modules/apps/shared/PageTitle'
import { Button } from '@/modules/ui/button'

export type PackageInfo = {
  packageName: string
  price: number
  features: string[]
}

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<PackageInfo | null>(
    null,
  )

  const handlePackageSelect = (packageInfo: PackageInfo) => {
    setSelectedPackage(packageInfo)
  }

  return (
    <Layout>
      <img src="banner.png" className="w-full" alt="" />
      <section
        className="container flex flex-col items-center justify-center mt-10"
        id="customers"
      >
        <div className="mb-16 flex w-full flex-col justify-center">
          <TitleWithMarquee title="Our Customers" />
          <PageTitle
            title="E-Learning Platform"
            heroText="Perfect SKILL "
            subtitle=" แพลตฟอร์มของเราเปิดโอกาสให้คุณได้แบ่งปันความรู้ สร้างรายได้แบบ Passive Income <br />
และพัฒนาตนเองพร้อมกับผู้เรียนพร้อมเครื่องมือที่ใช้งานง่ายเพื่อจัดการคอร์สเรียนออนไลน์ได้อย่างมืออาชีพและการสนับสนุนตลอด 24 ชั่วโมง"
            heroTextPosition="left"
          />
          <div className="mt-10 flex items-center justify-center">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              <StatsCard
                icon={
                  <PiStudentBold className="absolute top-5 h-36 w-36 text-red" />
                }
                title="ผู้เรียน"
                amount="10,000+"
              />
              <StatsCard
                icon={
                  <FaChalkboardTeacher className="absolute top-4 ml-10 h-36 w-36 text-red" />
                }
                title="ผู้สอน"
                amount="100+"
              />
              <StatsCard
                icon={
                  <IoLibrary className="absolute top-2 ml-4 h-36 w-36 text-red" />
                }
                title="คอร์สเรียน"
                amount="1,000+"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="flex w-full flex-col bg-red" id="features">
        <div className="bg-[url('/cover.png')] bg-cover bg-center p-6 w-full h-[70vh]">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20 items-center justify-center h-full">
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="text-center text-white font-medium text-2xl">
                เปลี่ยนความรู้ให้เป็นรายได้ <br /> สอนออนไลน์กับเรา!
              </div>
              <Button className="bg-custom-gradient p-6 text-white">
                ลงทะเบียนตอนนี้!
              </Button>
            </div>
            <div className="flex flex-col gap-6 text-xl md:text-2xl">
              <div className=" text-white font-medium">
                <div className="flex flex-col gap-2 justify-center">
                  <div className="flex gap-4 items-center">
                    <IoEarth className="text-icons" />
                    <p>เข้าถึงระบบการสอนได้ทุกที่ ทุกเวลา</p>
                  </div>
                  <p className="text-sm ml-11">
                    แบ่งปันความรู้ของคุณกับนักเรียนจากทุกมุมโลก
                  </p>
                </div>
              </div>
              <div className=" text-white font-medium">
                <div className="flex flex-col gap-2 justify-center">
                  <div className="flex gap-4 items-center">
                    <IoEarth className="text-icons" />
                    <p>เข้าถึงระบบการสอนได้ทุกที่ ทุกเวลา</p>
                  </div>
                  <p className="text-sm ml-11">
                    แบ่งปันความรู้ของคุณกับนักเรียนจากทุกมุมโลก
                  </p>
                </div>
              </div>
              <div className=" text-white font-medium">
                <div className="flex flex-col gap-2 justify-center">
                  <div className="flex gap-4 items-center">
                    <IoEarth className="text-icons" />
                    <p>เข้าถึงระบบการสอนได้ทุกที่ ทุกเวลา</p>
                  </div>
                  <p className="text-sm ml-11">
                    แบ่งปันความรู้ของคุณกับนักเรียนจากทุกมุมโลก
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="container flex flex-col items-center justify-center mt-6"
        id="partners"
      >
        <div className="flex w-full flex-col justify-center">
          <PageTitle
            title="ทำไมถึงต้องสอนกับ "
            subtitle=""
            heroText="Perfect SKILL"
            heroTextPosition="right"
          />
          <div className="mt-10 flex items-center justify-center">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <FeatureCard
                icon={'/icons/icon1.png'}
                title="เรียนรู้ได้ทุกที่ทุกเวลา"
                description="ผู้เรียนสามารถเข้าถึงวิดีโอการเรียนการสอน<br />ได้ทั้งบนคอมพิวเตอร์และมือถือ<br />ทำให้การเรียนรู้สะดวกและยืดหยุ่น"
              />
              <FeatureCard
                icon={'/icons/icon2.png'}
                title="แผนการเรียนรู้ส่วนบุคคล"
                description="ผู้เรียนสามารถวางแผนและติดตามความคืบหน้า<br />การเรียนรู้ของตนเองผ่านแดชบอร์ดที่ใช้งานง่าย"
              />
              <FeatureCard
                icon={'/icons/icon3.png'}
                title="ระบบถาม-ตอบ"
                description="ครูและแอดมินสามารถตอบคำถามและโต้ตอบกับ<br />นักเรียนภายในหลักสูตร เพื่อให้ความช่วยเหลือ<br />และคำแนะนำที่จำเป็น"
              />
              <FeatureCard
                icon={'/icons/icon4.png'}
                title="ระบบการจัดการหลักสูตรและการบ้าน"
                description="ครูสามารถสร้างและจัดการหลักสูตร กำหนดการบ้าน<br />ตรวจการบ้าน และตั้งวันกำหนดส่งได้อย่างสะดวก"
              />
              <FeatureCard
                icon={'/icons/icon5.png'}
                title="สร้างและตรวจข้อสอบได้ภายในระบบ"
                description="ครูสามารถสร้างข้อสอบและตรวจข้อสอบได้ทั้งแบบ<br />อัตโนมัติและแบบตรวจด้วยตนเอง<br />พร้อมกำหนดเกณฑ์การผ่านของข้อสอบได้"
              />
              <FeatureCard
                icon={'/icons/icon6.png'}
                title="การจัดการผู้ใช้งานและตั้งค่าเว็บไซต์"
                description="แอดมินสามารถจัดการข้อมูลผู้ใช้งานทั้งหมดในระบบ<br />รวมถึงการตั้งค่าและปรับแต่งเว็บไซต์<br />ให้เหมาะสมกับการใช้งาน"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        className="container flex flex-col items-center justify-center mt-12"
        id="partners"
      >
        <TitleWithMarquee title="Our Partners" />
      </section>
      <section
        className="container flex flex-col items-center justify-center mt-6"
        id="packages"
      >
        <div className="flex w-full flex-col justify-center">
          <PageTitle
            title="ค่าบริการระบบ Perfect SKILL E-Learning Platform"
            subtitle="เราขอนำเสนอแพ็กเกจ ระบบ E-Learning ที่ออกแบบมาเพื่อตอบโจทย์ทุกความต้องการของผู้สอน ให้การสร้างและจัดการคอร์สเรียนเป็นเรื่องง่ายและมีประสิทธิภาพ <br /> 
            พร้อมการสนับสนุนจากทีมงานมืออาชีพที่พร้อมช่วยเหลือคุณในทุกขั้นตอน เพื่อให้คุณได้สัมผัสประสบการณ์ที่ดีที่สุดในการสอนออนไลน์!"
            heroText="Perfect SKILL"
            heroTextPosition="middle"
          />
          <div className="mt-10 flex items-center justify-center">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              {packageLists.map((packageList, i) => (
                <PackageCard
                  key={i}
                  packageName={packageList.packageName}
                  price={packageList.price}
                  features={packageList.features}
                  onSelect={() => handlePackageSelect(packageList)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        className="flex w-full flex-col bg-custom-gradient p-8 mt-6"
        id="reviews"
      >
        <div className="mb-8 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-4">
            <p className="text-center text-3xl font-bold text-white">
              รีวิวจากผู้สอน
            </p>
            <IoChatbubbleEllipses className="text-3xl text-white" />
          </div>
          <p className="text-center text-white">
            นำเสนอความคิดเห็นและประสบการณ์จากผู้ใช้งานและองค์กรโดยตรง
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {[...(Array(3) as [])].map((_, i) => (
              <ReviewCard
                key={i}
                name="name"
                rating={5}
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut ..."
                avatar="/ellipse.png"
              />
            ))}
          </div>
        </div>
      </section>
      <Element name="contact-us">
        <section
          className="relative flex w-full flex-col bg-box-background p-8"
          id="contact-us"
        >
          <div className="absolute left-0 top-0 z-10 p-4">
            <div className="grid grid-cols-6 grid-rows-4 gap-4">
              {[...(Array(24) as [])].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-4 rounded-full bg-custom-gradient"
                />
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 right-0 z-10 p-4">
            <div className="grid grid-cols-6 grid-rows-4 gap-4">
              {[...(Array(24) as [])].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-4 rounded-full bg-custom-gradient"
                />
              ))}
            </div>
          </div>
          <div className="relative z-20 flex items-center justify-center gap-2">
            <ContactUsForm selectedPackage={selectedPackage} />
          </div>
        </section>
      </Element>
    </Layout>
  )
}

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import { useState } from 'react'

type MySwiperProps = {
  images: string[]
}

const MySwiper = (props: MySwiperProps) => {
  const [swiper, setSwiper] = useState<any>(null)

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      <IoChevronBackOutline
        className="h-10 w-10 cursor-pointer md:h-14 md:w-14"
        onClick={() => swiper && swiper?.slidePrev()}
      />
      <Swiper
        onSwiper={setSwiper}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
        className="relative h-[173px] w-[268px] p-0.5 lg:h-[346px] lg:w-[536px]"
      >
        {props.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index}`}
              className="h-full w-full rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <IoChevronForwardOutline
        className="h-10 w-10 cursor-pointer md:h-14 md:w-14"
        onClick={() => swiper && swiper.slideNext()}
      />
    </div>
  )
}

export default MySwiper

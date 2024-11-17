interface ImageIconBannerProps {
  icon: string
  title: string
  description: string
}

export const FeatureCard = (props: ImageIconBannerProps) => {
  return (
    <div className="h-70 flex  w-[330px] flex-col items-center justify-center gap-4 overflow-hidden rounded-xl bg-white p-2 shadow-md md:w-[410px]">
      <img src={props.icon} alt="icon1" className="h-24 w-24" />
      <div className="flex flex-col gap-2 text-center">
        <p className="text text-xl font-medium">{props.title}</p>
        <p
          className="text text-custom-black"
          dangerouslySetInnerHTML={{ __html: props.description }}
        ></p>
      </div>
    </div>
  )
}

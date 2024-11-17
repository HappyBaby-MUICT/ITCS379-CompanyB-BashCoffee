import Marquee from 'react-fast-marquee'

export const TitleWithMarquee = (props: { title: string }) => {
  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-center text-3xl font-semibold">{props.title}</div>
        <div className="h-2 w-14 rounded-lg bg-custom-gradient" />
      </div>
      <Marquee speed={50} autoFill={true} className="mt-10">
        <img src="/ellipse.png" className="mr-2 md:mr-20" alt="aws"/>
      </Marquee>
    </div>
  )
}

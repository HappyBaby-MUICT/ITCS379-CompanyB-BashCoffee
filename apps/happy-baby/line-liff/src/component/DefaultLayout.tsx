import Image from 'next/image'
import { ReactNode } from 'react' 

interface DefaultLayoutProps {
  children: ReactNode 
}

// Define the component with props
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex flex-col items-center w-full h-screen px-4 pt-24 pb-8">
      <div className="flex flex-col items-center bg-[#E9E5D7] rounded-xl w-full h-full gap-8 px-4">
        <div className="flex w-full justify-center mt-[-64]">
          <Image src="/bash_logo.png" width={120} height={120} alt="logo" />
        </div>
        {children}
      </div>
    </div>
  )
}

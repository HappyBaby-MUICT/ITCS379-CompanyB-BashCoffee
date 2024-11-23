import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

interface MembershipLayoutProps {
  children: ReactNode
}

export default function MembershipLayout({ children }: MembershipLayoutProps) {
  const { data: session } = useSession()
  
  return (
    session && (
      <div className="flex flex-col w-full h-screen p-8">
        <div className="flex flex-col bg-[#E9E5D7] rounded-xl w-full h-screen gap-4">
          <div className="flex justify-between items-center w-full">
            <img src="/bash_logo.png" width={40} height={40} alt="logo" />
            <p className=" font-bold text-[#4F3A32]">BASH MEMBERSHIP</p>
          </div>
          <div className="flex w-full items-center bg-[#6B4E3A] rounded-xl p-4 gap-4">
            <div className="flex items-center justify-center h-20 aspect-square overflow-hidden rounded-full bg-gray-300">
              <img
                src="/profilepic.jpg"
                alt="profilepicture"
                className="w-20 h-20 object-cover"
              />
            </div>
            <div className="flex flex-col w-1/2 gap-2 justify-start">
              <p className="text-md font-bold text-white uppercase truncate">
                {session.user.firstName} {session.user.lastName}
              </p>
              <p className="text-xs text-white">{session.user.points} Points</p>
              <p className="text-xs text-white">{session.user.phoneNumber}</p>
            </div>
          </div>
          <main className="flex flex-col items-center justify-center w-full">
            {children}
          </main>
        </div>
      </div>
    )
  )
}

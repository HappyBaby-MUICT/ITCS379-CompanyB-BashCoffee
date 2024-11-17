import { ReactNode } from 'react'

interface DefaultLayoutProps {
  children: ReactNode
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex flex-col justify-center w-full h-screen p-8">
      <div className="flex flex-col bg-[#E9E5D7] rounded-xl w-full h-screen p-8">
        <div className="flex items-center justify-center w-full">
          <img
            src="/bash_logo.png"
            width={120}
            height={120}
            alt="logo"
            className="mx-auto"
          />
        </div>
        <main className="flex flex-col items-center justify-center w-full mt-4">
          {children}
        </main>
      </div>
    </div>
  )
}

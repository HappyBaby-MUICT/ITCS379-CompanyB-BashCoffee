import { Footer } from '@/modules/apps/layouts/Footer'
import { Navbar } from '@/modules/apps/layouts/Navbar'

export type LayoutProps = {
  children?: React.ReactNode
  reduceAnimation?: boolean
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      <main className="content">{children}</main>
      <Footer />
    </div>
  )
}

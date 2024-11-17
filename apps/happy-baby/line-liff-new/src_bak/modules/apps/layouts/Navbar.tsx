import { List } from '@phosphor-icons/react'
import Link from 'next/link'
import { useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'

import { NavbarItem } from '@/modules/apps/layouts/NavbarItem'
import { SimpleCollaspe } from '@/modules/apps/shared/SimpleCollaspe'
import { Button } from '@/modules/ui/button'

const DesktopNavbarItems = () => {
  const ROUTES = [
    {
      name: 'หน้าหลัก',
      path: '/',
    },
    {
      name: 'เกี่ยวกับเรา',
      path: '/',
    },
    {
      name: 'หลักสูตรทั้งหมด',
      path: '/',
    },
  ]

  return (
    <div className="flex flex-col items-center gap-1 md:flex-row md:justify-center md:gap-4">
      {ROUTES.map(route => (
        <Link
          className="block h-full text-center font-semibold md:text-left"
          key={route.path}
          href={route.path}
        >
          <NavbarItem>{route.name}</NavbarItem>
        </Link>
      ))}
      <ScrollLink to='contact-us' smooth duration={800}>
        <Button className="w-full bg-custom-gradient p-6 text-white md:w-auto">
          สอนกับเรา
        </Button>
      </ScrollLink>
    </div>
  )
}

export const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <header className="navbar sticky top-0 z-50 bg-white bg-opacity-80">
      <div className="fi backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="fi gap-4">
            <section className="fi">
              <Link href="#">
                <img
                  src="/perfect_skill.png"
                  alt="Perfect Skill Sales Page"
                  className="h-14"
                />
              </Link>
            </section>
            <section className="ml-auto">
              <section className="hidden md:block">
                <div className="fi h-[var(--navbar-height)]">
                  <DesktopNavbarItems />
                </div>
              </section>
              <section>
                <div className="block md:hidden">
                  <div
                    className="h-[var(--navbar-height)]"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                  >
                    <NavbarItem>
                      <List size={24} />
                    </NavbarItem>
                  </div>
                </div>
              </section>
            </section>
          </div>
          <section>
            <SimpleCollaspe open={isMobileOpen}>
              <div className="grid gap-0 pb-3 pt-1">
                <DesktopNavbarItems />
              </div>
            </SimpleCollaspe>
          </section>
        </div>
      </div>
    </header>
  )
}

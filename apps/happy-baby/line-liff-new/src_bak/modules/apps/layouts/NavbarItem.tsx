import { cn } from '@/libs/utils'

export type NavbarItemProps = {
  children?: React.ReactNode
  className?: string
}

export const NavbarItem = ({
  className,
  children,
  ...rest
}: NavbarItemProps) => (
  <div
    className={cn([
      'flex h-full items-center px-2.5 py-2.5 md:px-4 md:py-0',
      'hover:text-red-500',
      'active:text-red-600',
      'cursor-pointer transition-all',
      className,
    ])}
    {...rest}
  >
    {children}
  </div>
)

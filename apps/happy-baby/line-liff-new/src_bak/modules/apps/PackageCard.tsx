import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import { Link as ScrollLink } from 'react-scroll'

import { Button } from '@/modules/ui/button'
import { Card } from '@/modules/ui/card'

interface PackageCardProps {
  packageName: string
  price: number
  features: string[]
  onSelect: () => void // new prop
}

export const PackageCard = (props: PackageCardProps) => {
  return (
    <Card className="h-[400px] w-80 rounded-md shadow-lg bg-white border-0 flex flex-col justify-between">
      <div className="flex flex-col p-6 gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="font-medium text-xl">{props.packageName}</h1>
          <span className="flex flex-row gap-2 items-center">
            <p className="inline-block bg-custom-gradient bg-clip-text text-2xl font-bold text-transparent">
              {props.price.toLocaleString()}
            </p>
            <p className="text-sm">บาท / เดือน</p>
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-xl">ประกอบด้วย</h1>
          <ul className="flex flex-col gap-2 list-none list-inside">
            {props.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-4">
                <IoCheckmarkCircleOutline className="text-icons h-6 w-6" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-6">
        <ScrollLink to="contact-us" smooth duration={600}>
          <Button
            className="w-full bg-custom-gradient text-white"
            onClick={props.onSelect}
          >
            ติดต่อขอใบเสนอราคา
          </Button>
        </ScrollLink>
      </div>
    </Card>
  )
}

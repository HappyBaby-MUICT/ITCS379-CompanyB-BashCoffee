import { TransactionHistory } from '@/service/auth/types'

type HistoryCardProps = TransactionHistory

const handleType = (type: string) => {
  switch (type) {
    case 'POINT_DEDUCT':
      return 'Point Redeemed'
    case 'POINT_INCREMENT':
      return 'Point Collected'
    default:
      return ''
  }
}

const HistoryCard = (props: HistoryCardProps) => {
  return (
    <div className="flex flex-col gap-1 w-full bg-[#D5CBB1] p-4 rounded-xl mb-2">
      <div className="flex items-center w-full justify-between">
        <p className="text-lg text-[#2D1810]">{handleType(props.type)}</p>
        <p className="text-lg text-[#2D1810]">
          {props.type === 'POINT_DEDUCT' ? '-' : '+'}
          {props.amount}
        </p>
      </div>
      <p className="text-sm text-[#454648]">{props.createdAt}</p>
    </div>
  )
}

export default HistoryCard

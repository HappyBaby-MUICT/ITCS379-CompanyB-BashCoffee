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

const formatTime = (time: string) => {
  const now = new Date(time)
  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })
  
  return formatter.format(now).replace(',', '')
}

const HistoryCard = (props: HistoryCardProps) => {
  return (
    <div className="history-card flex flex-col gap-1 w-full bg-[#D5CBB1] p-4 rounded-xl mb-2">
      <div className="flex items-center w-full justify-between">
        <p className="text-lg text-[#2D1810]">{handleType(props.type)}</p>
        <p className="text-lg text-[#2D1810]">
          {props.type === 'POINT_DEDUCT' ? '-' : '+'}
          {props.amount}
        </p>
      </div>
      <p className="text-sm text-[#454648]">{formatTime(props.createdAt)}</p>
    </div>
  )
}

export default HistoryCard

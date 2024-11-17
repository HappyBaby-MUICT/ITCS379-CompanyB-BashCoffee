import React from 'react'

interface StatsCardProps {
  icon: React.ReactNode
  title: string
  amount: string
}

export const StatsCard = (props: StatsCardProps) => {
  return (
    <div className="relative flex h-36 w-80 overflow-hidden rounded-xl bg-cream">
      <div className="flex flex-col justify-center text-center">
        {props.icon}
        <div className="absolute right-8 text-center">
          <p className="text-lg">{props.title}</p>
          <p className="inline-block bg-custom-gradient bg-clip-text text-4xl font-bold text-transparent">
            {props.amount}
          </p>
        </div>
      </div>
    </div>
  )
}

import { Spinner } from '@phosphor-icons/react'

export const SimpleSpinner = () => {
  return (
    <div className="flex items-center justify-center py-2">
      <Spinner className="animate-spin text-black" size={32} />
    </div>
  )
}

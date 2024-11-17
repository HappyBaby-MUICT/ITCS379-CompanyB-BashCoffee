import { FaStar } from 'react-icons/fa'

interface ReviewCardProps {
  name: string
  rating: number
  description: string
  avatar: string
}

export const ReviewCard = (props: ReviewCardProps) => {
  return (
    <div className="mb-4 h-[250px] w-[330px] rounded-xl bg-white p-4 shadow-md md:w-[400px]">
      <div className="mb-4 flex items-center">
        <img
          src={props.avatar}
          alt="User Avatar"
          className="mr-4 h-12 w-12 rounded-full"
        />
        <div>
          <h3 className="text-lg font-bold">{props.name}</h3>
        </div>
      </div>
      <div className="flex-colitems-center mb-4 flex">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col ">
            <p>ชื่อตำแหน่ง</p>
            <p>ชื่อองค์กร</p>
          </div>
          <div className="flex gap-1">
            {[...Array(props.rating)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600">{props.description}</p>
    </div>
  )
}

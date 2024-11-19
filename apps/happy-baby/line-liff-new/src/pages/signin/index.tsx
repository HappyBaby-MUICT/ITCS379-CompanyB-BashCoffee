// import { useRouter } from 'next/router'
// import { useState } from 'react'
// import DefaultLayout from '@/component/DefaultLayout'
// import { z } from 'zod'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'

// export default function Signin() {
//   const [phoneNumber, setPhoneNumber] = useState('')
//   const router = useRouter()

//   const formSchema = z.object({
//     phoneNumber: z.string()
//   })

//   // Function to format phone number
//   const formatPhoneNumber = (value: string) => {
//     const cleaned = value.replace(/\D/g, '') // Remove non-numeric characters
//     const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
//     if (!match) {return value}
//     const formatted = [match[1], match[2], match[3]].filter(Boolean).join('-')

//     return formatted
//   }

//     const form = useForm<z.infer<typeof formSchema>>({
//       resolver: zodResolver(formSchema),
//       defaultValues: {
//         phoneNumber: '',
//       },
//     })
  

//   return (
//     <DefaultLayout>
//       <div className="flex flex-col items-center w-full gap-8">
//         {/* Title and Welcome Text */}
//         <div className="flex flex-col items-center gap-2 w-full">
//           <p className="font-bold text-xl text-center text-[#4F3A32]">
//             SIGN IN
//           </p>
//           <p className="text-sm text-center text-[#17181A]">
//             Welcome to Bash Coffee Membership!
//           </p>
//         </div>

//         {/* Form */}
//         <form className="w-full mx-auto">
//           <label className="block mb-3 text-sm font-semibold">
//             Phone number
//           </label>
//           <input
//             type="text"
//             id="phone-input"
//             aria-describedby="helper-text-explanation"
//             className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
//             placeholder="xxx-xxx-xxxx"
//             required
//           />
//           <button
//             type="submit"
//             className="text-white w-full bg-[#2D1810] hover:bg-[#2D1810]/80 font-semibold rounded-lg text-sm py-3 mb-2 mt-4"
//           >
//             SIGN IN
//           </button>
//         </form>

//         {/* Sign Up Link */}
//         <span className="text-right w-full">
//           <span className="text-sm">Don&apos;t Have an Account? </span>
//           <a href="/signup" className="text-sm font-semibold text-[#846546]">
//             Sign up
//           </a>
//         </span>
//       </div>
//     </DefaultLayout>
//   )
// }
import { useRouter } from 'next/router'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/modules/ui/button'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/modules/ui/form'
import { Input } from '@/modules/ui/input'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import DefaultLayout from '@/component/DefaultLayout'
import { sendOtp } from '@/service/auth'

const formSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
})

export default function Signin() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: '',
    },
  })

  const handleOtp = useMutation(sendOtp)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await handleOtp.mutateAsync(values)
    } catch (e) {
      toast.error('Failed to send OTP: ' + e)
    }
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center w-full gap-8">
        <div className="flex flex-col items-center gap-2 w-full">
          <p className="font-bold text-xl text-center text-[#4F3A32]">
            SIGN IN
          </p>
          <p className="text-sm text-center text-[#17181A]">
            Welcome to Bash Coffee Membership!
          </p>
        </div>
        {/* Form */}
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-3 text-sm font-semibold">
                      Phone number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="xxx-xxx-xxxx"
                        {...field}
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full text-white bg-[#2D1810] hover:bg-[#2D1810]/80 font-semibold rounded-lg text-sm py-3"
                // className="w-full"
                disabled={handleOtp.isLoading}
              >
                {handleOtp.isLoading ? 'Sending OTP...' : 'SIGN IN'}
              </Button>
            </form>
          </Form>
        </div>

        {/* Sign Up Link */}
        <span className="text-right w-full">
          <span className="text-sm">Don&apos;t have an account? </span>
          <a href="/signup" className="text-sm font-semibold text-[#846546]">
            Sign up
          </a>
        </span>
      </div>
    </DefaultLayout>
  )
}

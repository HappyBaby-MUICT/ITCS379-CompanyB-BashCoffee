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
import Link from 'next/link'

const formSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
})

export default function Signin() {
  const router = useRouter()
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
      router.push('/auth/verify?phoneNumber=' + values.phoneNumber)
    } catch (e) {
      const error = (e as Error).message
      if (error === 'User not found') {
        toast.error('User not found. Please sign up first.')
        router.push('/auth/signup?phoneNumber=' + values.phoneNumber)

        return
      }
      toast.error('Failed to send OTP: ' + (e as Error).message)
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
                disabled={handleOtp.isLoading}
              >
                SIGN IN
              </Button>
            </form>
          </Form>
        </div>

        {/* Sign Up Link */}
        <span className="text-right w-full">
          <span className="text-sm">Don&apos;t have an account? </span>
          <Link href="/auth/signup">
            <span className="text-sm font-semibold text-[#846546]">
              Sign up
            </span>
          </Link>
        </span>
      </div>
    </DefaultLayout>
  )
}

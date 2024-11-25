import DefaultLayout from '@/component/DefaultLayout'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/modules/ui/form'
import { Button } from '@/modules/ui/button'
import { Input } from '@/modules/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { register, sendOtp } from '@/service/auth'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be 10 digits')
    .max(10, 'Phone number must be 10 digits'),
  firstName: z.string(),
  lastName: z.string(),
})

export default function Signup() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
    },
  })

  const handleRegister = useMutation(register)
  const handleOtp = useMutation(sendOtp)

  const query = router.query
  if (query.phoneNumber) {
    form.setValue('phoneNumber', query.phoneNumber as string)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await handleRegister.mutateAsync(values)
      await handleOtp.mutateAsync(values)

      router.push('/auth/verify?phoneNumber=' + values.phoneNumber)
    } catch (e) {
      toast.error('Failed to register: ' + (e as Error).message)
    }
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center w-full gap-8">
        <div className="flex flex-col items-center gap-2 w-full">
          <p className=" font-bold text-xl text-center text-[#4F3A32]">
            SIGN UP
          </p>
          <p className=" text-sm text-center text-[#17181A]">
            Let&apos;s be one of bash members!
          </p>
        </div>

        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-3 text-sm font-semibold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ict@bashcoffee.com"
                        {...field}
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-3 text-sm font-semibold">
                      Phone Number
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
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-3 text-sm font-semibold">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="first name"
                        {...field}
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-3 text-sm font-semibold">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="last name"
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
                disabled={handleOtp.isLoading || handleRegister.isLoading}
              >
                SIGN UP
              </Button>
            </form>
          </Form>
        </div>
        <span className="text-right w-full mt-[-4]">
          <span className="text-sm">Already Have an Account? </span>
          <a href="/signin" className="text-sm font-semibold text-[#846546]">
            Sign in
          </a>
        </span>
      </div>
    </DefaultLayout>
  )
}

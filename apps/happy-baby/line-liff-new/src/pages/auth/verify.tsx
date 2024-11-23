import DefaultLayout from '@/component/DefaultLayout'
import { useRouter } from 'next/router'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/service/auth'
import { useForm } from 'react-hook-form'
import { Button } from '@/modules/ui/button'
import { Form, FormField } from '@/modules/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/modules/ui/input-otp'
import { toast } from 'sonner'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

const formSchema = z.object({
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'),
  otp: z.string().min(4, 'OTP code must be 4 digits'),
})

export default function Verify() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: '',
      otp: '',
    },
  })

  const handleLogin = useMutation(login)

  const query = router.query

  if (router.query.phoneNumber) {
    form.setValue('phoneNumber', query.phoneNumber as string)
  }

  if (!query.phoneNumber) {
    toast.error('Phone number is required')
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await handleLogin.mutateAsync(values)
      toast.success('Successfully logged in!')
      router.push('/profile')
    } catch (error) {
      toast.error('Login error: ' + (error as Error).message)
      console.error(error)
    }
  }

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center w-full gap-2">
        <h1 className="text-xl font-bold text-[#2D1810] mt-4">
          Enter OTP code sent to
        </h1>
        <h2 className="text-xl text-[#2D1810] mb-4">{query.phoneNumber}</h2>
        <Form {...form}>
          <div className="w-full space-y-8">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <InputOTP
                      maxLength={4}
                      {...field}
                      pattern={REGEXP_ONLY_DIGITS}
                    >
                      <InputOTPGroup className="mx-auto">
                        <InputOTPSlot
                          index={0}
                          className="w-16 h-16 text-3xl text-[#846546] bg-white"
                          inputMode="numeric"
                        />
                        <InputOTPSlot
                          index={1}
                          itemType="number"
                          className="w-16 h-16 text-3xl text-[#846546] bg-white"
                          inputMode="numeric"
                        />
                        <InputOTPSlot
                          index={2}
                          itemType="number"
                          className="w-16 h-16 text-3xl text-[#846546] bg-white"
                          inputMode="numeric"
                        />
                        <InputOTPSlot
                          index={3}
                          itemType="number"
                          className="w-16 h-16 text-3xl text-[#846546] bg-white"
                          inputMode="numeric"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2 items-center justify-center mt-6">
                  <p className="text-sm">Didn&#39;t get OTP code? </p>
                  <button
                    type="button"
                    //  onClick={handleResend}
                    className="text-center text-[#846546] hover:underline font-bold"
                  >
                    Resend
                  </button>
                </div>
                <Button
                  type="submit"
                  className="w-full text-white bg-[#2D1810] hover:bg-[#2D1810]/80 font-semibold rounded-lg text-sm py-3"
                >
                  VERIFY OTP
                </Button>
              </div>
            </form>
          </div>
        </Form>
      </div>
    </DefaultLayout>
  )
}

import { useEffect, useRef, useState } from 'react'
import MembershipLayout from '@/component/MembershipLayout'
import { FaUserPen } from 'react-icons/fa6'
import Link from 'next/link'
import { IoArrowBack } from 'react-icons/io5'
import { Button } from '@/modules/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/modules/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { Input } from '@/modules/ui/input'
import { updateUser } from '@/service/auth'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/router'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string(),
  lastName: z.string(),
})

export default function Profile() {
  const { data: session, update, status } = useSession()
  const hasUpdatedForm = useRef(false)
  const router = useRouter()

  const handleUpdateUser = useMutation(updateUser)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await handleUpdateUser.mutateAsync(values)
      update()
      toast.success('Profile updated!')
      router.push('/profile')
    } catch (e) {
      toast.error('Failed to update user: ' + (e as Error).message)
    }
  }

  useEffect(() => {
    if (status === 'authenticated' && !hasUpdatedForm.current) {
      form.setValue('email', session.user.email)
      form.setValue('firstName', session.user.firstName)
      form.setValue('lastName', session.user.lastName)
      update()
      hasUpdatedForm.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MembershipLayout>
      <div className="flex flex-col items-center w-full gap-8">
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex gap-2 items-center justify-between my-2 w-full">
            <Link href="/profile">
              <IoArrowBack size={24} color="#AB9064" />
            </Link>
            <div className="flex gap-2 items-center my-2">
              <FaUserPen size={20} />
              <p className=" font-bold text-md">Profile</p>
            </div>
          </div>
          <div className="w-full max-w-md">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  className="w-full text-white bg-[#2D1810] hover:bg-[#2D1810]/80 font-semibold rounded-lg text-sm py-3 mt-4"
                  // disabled={handleOtp.isLoading || handleRegister.isLoading}
                >
                  SAVE CHANGES
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </MembershipLayout>
  )
}

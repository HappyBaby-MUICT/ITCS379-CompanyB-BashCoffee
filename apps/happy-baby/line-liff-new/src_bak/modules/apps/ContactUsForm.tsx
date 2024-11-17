import { zodResolver } from '@hookform/resolvers/zod'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { toast } from 'sonner'
import { z } from 'zod'

import { packageLists } from '@/constants/package'
import { Button } from '@/modules/ui/button'
import { Card } from '@/modules/ui/card'
import { Checkbox } from '@/modules/ui/checkbox'
import { DateTimePicker } from '@/modules/ui/date-time-picker'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/modules/ui/form'
import { Input } from '@/modules/ui/input'
import { PhoneInput } from '@/modules/ui/phone-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/ui/select'
import { Textarea } from '@/modules/ui/textarea'
import { PackageInfo } from '@/pages'
import { api } from '@/utils/api'

import { SimpleCollaspe } from './shared/SimpleCollaspe'

const formSchema = z.object({
  fullName: z.string().nonempty('กรุณากรอกชื่อและนามสกุลของท่าน'),
  email: z
    .string()
    .email('อีเมลของคุณไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง')
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'อีเมลของคุณไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง',
    ),
  phone: z
    .string()
    .nonempty('กรุณากรอกเบอร์โทรศัพท์ของท่าน')
    .refine(isValidPhoneNumber, 'กรุณากรอกเบอร์โทรศัพท์ของท่านให้ถูกต้อง'),
  corporateType: z.string(),
  companyName: z.string().optional(),
  availableHours: z.date(),
  message: z.string().optional(),
  packageName: z.string().optional(),
  acceptTerms: z
    .boolean()
    .refine(
      val => val === true,
      'คุณต้องยอมรับข้อตกลงเงื่อนไขการใช้บริการเพื่อดำเนินการต่อ',
    ),
})

export const ContactUsForm = ({
  selectedPackage,
}: {
  selectedPackage: PackageInfo | null
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      corporateType: 'บุคคลธรรมดา',
      companyName: undefined,
      availableHours: undefined,
      message: '',
      acceptTerms: false,
      packageName: 'none',
    },
    resolver: zodResolver(formSchema),
  })

  const handleInquiry = api.post.inquiry.useMutation({
    onSuccess: () => {
      toast.success(
        'ข้อมูลของท่านได้ถูกบันทึกในระบบเรียบร้อยแล้ว โปรดรอทางทีมงานติดต่อกลับ',
      )
      form.reset()
    },
    onError: error => {
      toast.error(error.message)
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await handleInquiry.mutateAsync(values)
  }

  const [key, setKey] = useState(0) // Add a state for key

  useEffect(() => {
    if (selectedPackage) {
      form.setValue('packageName', selectedPackage.packageName)
      setKey(prevKey => prevKey + 1)
    }
  }, [form, selectedPackage])

  return (
    <div className="flex w-full flex-col items-center justify-center p-4 lg:flex-row lg:p-8">
      <Card className="mb-8 flex w-fit flex-col rounded-lg bg-white p-8 shadow-lg lg:mb-0 lg:mr-10 lg:w-1/3">
        <h2 className="mb-4 text-2xl font-bold">ลงทะเบียนสมัครสอนได้แล้ววันนี้!</h2>
        <Form {...form}>
          <form
            className="flex flex-col w-full gap-5"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ชื่อ-นามสกุล<span className="text-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage className="text-red font-medium" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    อีเมล<span className="text-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage className="text-red font-medium" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    เบอร์โทรศัพท์<span className="text-red">*</span>
                  </FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput {...field} defaultCountry="TH" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="corporateType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ประเภทองค์กร<span className="text-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue className="font-medium" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          'บุคคลธรรมดา',
                          'หน่วยงานเอกชน',
                          'หน่วยงานภาครัฐ',
                          'รัฐวิสาหกิจ',
                        ].map((value, i) => (
                          <SelectItem
                            className="font-medium"
                            key={i}
                            value={value}
                          >
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SimpleCollaspe
              open={['หน่วยงานเอกชน', 'หน่วยงานภาครัฐ', 'รัฐวิสาหกิจ'].includes(
                form.watch('corporateType'),
              )}
              className="w-full"
            >
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      ชื่อบริษัท<span className="text-red">*</span>
                    </FormLabel>
                    <FormControl className="w-full">
                      <Input className="w-full" required {...field} />
                    </FormControl>
                    <FormMessage className="text-red font-medium" />
                  </FormItem>
                )}
              />
            </SimpleCollaspe>
            <FormField
              control={form.control}
              name="availableHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="datetime">
                    ช่วงเวลาที่สะดวกให้ติดต่อ<span className="text-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <DateTimePicker
                      granularity="minute"
                      jsDate={field.value}
                      onJsDateChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="packageName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    แพ็คเกจที่สนใจ<span className="text-red">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      key={key} // Add key prop to force re-render
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue className="font-medium" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem className="font-medium" value="none">
                          ไม่มีแพ็คเกจที่สนใจ
                        </SelectItem>
                        {packageLists.map((value, i) => (
                          <SelectItem
                            className="font-medium"
                            key={i}
                            value={value.packageName}
                          >
                            {value.packageName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>รายละเอียดเพิ่มเติม</FormLabel>
                  <FormControl>
                    <Textarea
                      className="w-full rounded-md border px-3 py-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red font-medium" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start rounded-md space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value as CheckedState}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <span className="ml-2 font-medium">
                    ยอมรับ{' '}
                    <a
                      href="#contact-us"
                      className="inline-block bg-custom-gradient bg-clip-text font-bold text-transparent"
                    >
                      ข้อตกลงเงื่อนไขการใช้บริการ
                    </a>
                  </span>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full rounded-md bg-custom-gradient px-4 py-2 font-semibold text-white"
            >
              ส่งคำร้องขอทดลองใช้
            </Button>
          </form>
        </Form>
      </Card>
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <img src="/person.png" alt="Person" className="h-full" />
      </div>
    </div>
  )
}

export default ContactUsForm

import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Toaster } from '@/modules/ui/sonner'
import { toast } from 'sonner'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'

import { api } from '@/utils/api'

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: error => {
        toast.error(
          'พบข้อผิดพลาดในการติดต่อกับเซิร์ฟเวอร์: ' +
            (error as { message: string }).message,
        )
      },
    },
  },
})

const App = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultSeo
        defaultTitle="Perfect LEARNING"
        titleTemplate="Perfect LEARNING | %s"
        canonical="https://perfectcomsolutions.com/"
        description="เสริมพลังการเรียนรู้ของคุณด้วยแหล่งข้อมูลและคอร์สเรียนที่หลากหลาย และเปลี่ยนพนักงานในองค์กร
        ให้เติบโตและปรับตัวให้เหมาะสมกับความรู้ ในปัจจุบันที่เติบโตอย่างรวดเร็ว พร้อมที่จะนำเสนอโซลูชั่นใหม่ๆในโลกองค์กรของคุณ"
      />
      <QueryClientProvider client={queryClient}>
        <main>
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <Component {...pageProps} />
          <Toaster />
        </main>
      </QueryClientProvider>
    </>
  )
}

export default api.withTRPC(App)

import localFont from 'next/font/local'

export const geist = localFont({
  src: [
    {
      path: './fonts/GeistVF.woff',
      weight: '300 700',
      style: 'normal',
    }
  ],
  variable: '--font-geist'
})

export const geistMono = localFont({
  src: [
    {
      path: './fonts/GeistMonoVF.woff',
      weight: '300 700',
      style: 'normal',
    }
  ],
  variable: '--font-geist-mono'
})
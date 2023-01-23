import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { Ubuntu } from '@next/font/google'

const ubuntu = Ubuntu({ weight: '400',subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return <div className={ubuntu.className}>
    <Navbar />
    <Component {...pageProps} />
    <Footer />
  </div>
}

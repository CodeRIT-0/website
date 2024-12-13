import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CodeRIT',
  description: 'A community that helps develop the Coding culture of RIT',
  keywords: "coding,coderit,ramaiah,rit,code,programming,msrit,college,club",
  metadataBase: new URL("https://coderit.netlify.app"),
  openGraph: {
    title: "CodeRIT",
    type: "website",
    locale: "en_IE",
    url: "https://coderit.netlify.app/",
    siteName: "CodeRIT",
    description: "A community that helps develop the Coding culture of RIT",
    images: [
      {
        url: "https://i.ibb.co/THPrSvG/Frame-15.png",
        width: 1200,
        height: 630,
        alt: "CodeRIT Cover Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeRIT",
    description: "A community that helps develop the Coding culture of RIT",
  },
};


const mystyle={
  minHeight:'100vh',
  display: 'flex',
  flexDirection: 'column'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={mystyle}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}

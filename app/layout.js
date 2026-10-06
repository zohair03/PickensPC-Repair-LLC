import { Bitcount_Single, Boldonse, Roboto } from "next/font/google";
import "./globals.css";
import BusinessInfo from "@/cms/business Info/businessInfo";
import NavbarWrapper from "./NavbarWrapper.js";
import Navbar from "@/components/sections/navbarSection/navbar";
import Footer from "@/components/sections/footer";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

const bitcountSingle = Bitcount_Single({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-bitcount-single',
  display: 'swap',
})

const boldonse = Boldonse({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-boldonse',
  display: 'swap',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  title: BusinessInfo.BusinessName,
  description: "Computer reparing shop and refurbhish laptop selling",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${bitcountSingle.variable} ${boldonse.variable} antialiased`} suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
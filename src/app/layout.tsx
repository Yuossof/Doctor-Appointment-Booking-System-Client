import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
<<<<<<< HEAD
import ToastMessageProvider from "@/components/Context/ToastMessage";
=======
import Footer from "@/components/footer/Footer";
>>>>>>> 0ec8306bc817504dfdb540a4e4ed355dc07de486

export const metadata: Metadata = {
  title: "Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
<html lang="en">
      <body>
        <ToastMessageProvider>
=======
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
>>>>>>> 0ec8306bc817504dfdb540a4e4ed355dc07de486
        <div className="w-full flex justify-center">
          <div className="w-full">
            <div className="my-[35px] container px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]">
              <Header />
            </div>
            <main>
              {children}
            </main>
            <div className="translate-y-[35px] container px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]">
              <div className="my-32 w-full"></div>
              <Footer />
            </div>
          </div>
        </div>
        </ToastMessageProvider>
      </body>
    </html>
  );
}

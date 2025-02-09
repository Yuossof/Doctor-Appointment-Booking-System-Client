import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import ToastMessageProvider from "@/components/Context/ToastMessage";
import Footer from "@/components/footer/Footer";
import CheckPathName from "@/components/CheckPathName/CheckPathName";

export const metadata: Metadata = {
  title: "Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body>
        <ToastMessageProvider>
        <div className="w-full flex justify-center">
          <div className="w-full">
            <div className="my-[35px] container px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]">
              <Header />
            </div>
            <main>
              {children}
            </main>
            <CheckPathName/>
          </div>
        </div>
        </ToastMessageProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import ToastMessageProvider from "@/components/Context/ToastMessage";

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
          <div className="w-full flex justify-center relative">
            <div className="container px-[5px] md:px-[20px] lg:px-[80px]">
              <div className="translate-y-[35px]">
                <Header />
              </div>
              <main>
                {children}
              </main>
            </div>
          </div>
        </ToastMessageProvider>
      </body>
    </html>
  );
}

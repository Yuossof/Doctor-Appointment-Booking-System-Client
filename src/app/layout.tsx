import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import ToastMessageProvider from "@/components/Context/ToastMessage";
import UserProvider from "@/components/Context/User";
import FooterWithCheckPathName from "@/components/CheckPathName/FooterWithCheckPathName";


export const metadata: Metadata = {
  title: "Home",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
      <body>
        <ToastMessageProvider>
          <UserProvider>
            <div className="w-full flex justify-center">
              <div className="w-full">
                <div>
                  <Header />
                </div>
                <main>
                  {children}
                </main>
                <FooterWithCheckPathName />
              </div>
            </div>
          </UserProvider>
        </ToastMessageProvider>
      </body>
    </html>
  );
}

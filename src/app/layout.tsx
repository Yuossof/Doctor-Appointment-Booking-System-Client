import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import ToastMessageProvider from "@/components/Context/ToastMessage"; 
import FooterWithCheckPathName from "@/components/CheckPathName/FooterWithCheckPathName";

export const metadata: Metadata = {
  title: "Home",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
      <body>
        <ToastMessageProvider>
          <div className="w-full flex flex-col">
            <Header />
            <div className="w-full">
              <main>{children}</main>
            </div>

            {/* Footer  */}
            <FooterWithCheckPathName />
          </div>
        </ToastMessageProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import FooterWithCheckPathName from "@/components/CheckPathName/FooterWithCheckPathName";
import LayoutProviders from "@/components/layout/LayoutProviders";

export const metadata: Metadata = {
  title: "Home",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <LayoutProviders> 
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
        </LayoutProviders>
      </body>
    </html >
  );
}

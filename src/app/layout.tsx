import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import ToastMessageProvider from "@/components/Context/ToastMessage";
import UserProvider from "@/components/Context/User";
import FooterWithCheckPathName from "@/components/CheckPathName/FooterWithCheckPathName";
import DoctorsPagesNumber from "@/components/Context/PageNumberDoctors";
import ReviewsPagesNumber from "@/components/Context/PageNumberReviews";
import TotalPagesReviews from "@/components/Context/TotalPagesReviews";
import Doctors from "@/components/Context/Doctor";


export const metadata: Metadata = {
  title: "Home",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
      <body>
        <ToastMessageProvider>
          <UserProvider>
            <DoctorsPagesNumber>
              <ReviewsPagesNumber>
                <TotalPagesReviews>
                  <Doctors>
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
                  </Doctors>
                </TotalPagesReviews>
              </ReviewsPagesNumber>
            </DoctorsPagesNumber>
          </UserProvider>
        </ToastMessageProvider>
      </body>
    </html>
  );
}

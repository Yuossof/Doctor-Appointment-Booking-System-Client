import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import ToastMessageProvider from "@/Context/ToastMessage";
import UserProvider from "@/Context/User";
import FooterWithCheckPathName from "@/components/CheckPathName/FooterWithCheckPathName";
import DoctorsPagesNumber from "@/Context/PageNumberDoctors";
import ReviewsPagesNumber from "@/Context/PageNumberReviews";
import TotalPagesReviews from "@/Context/TotalPagesReviews";
import Doctors from "@/Context/Doctor";
import AddReport from "@/Context/AddReport";

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
                    <AddReport>
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
                    </AddReport>
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

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
import MessageProvider from "@/components/Context/AlertMessage";
import SearchForName from "@/components/Context/DoctorsFilter/SearchForName";
import AgeProvider from "@/components/Context/DoctorsFilter/DoctorsAge";
import GenderProvider from "@/components/Context/DoctorsFilter/DoctorGender";
import AvilabilityProvider from "@/components/Context/DoctorsFilter/DoctorAvialbilty";
import SpecializationProvider from "@/components/Context/DoctorsFilter/DoctorSpecialization";
import SalaryProvider from "@/components/Context/DoctorsFilter/DoctorSalary";


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
                    <MessageProvider>
                      <SearchForName>
                        <AgeProvider>
                          <GenderProvider>
                            <AvilabilityProvider>
                              <SpecializationProvider>
                                <SalaryProvider>
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
                                </SalaryProvider>
                              </SpecializationProvider>
                            </AvilabilityProvider>
                          </GenderProvider>
                        </AgeProvider>
                      </SearchForName>
                    </MessageProvider>
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

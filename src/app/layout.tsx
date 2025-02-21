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
import MessageProvider from "@/Context/AlertMessage";
import SearchForName from "@/Context/DoctorsFilter/SearchForName";
import AgeProvider from "@/Context/DoctorsFilter/DoctorsAge";
import GenderProvider from "@/Context/DoctorsFilter/DoctorGender";
import AvilabilityProvider from "@/Context/DoctorsFilter/DoctorAvialbilty";
import SpecializationProvider from "@/Context/DoctorsFilter/DoctorSpecialization";
import SalaryProvider from "@/Context/DoctorsFilter/DoctorSalary";
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

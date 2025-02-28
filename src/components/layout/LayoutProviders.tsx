"use client"
import React from 'react'
import ToastMessageProvider from "@/Context/ToastMessage";
import UserProvider from "@/Context/User";
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
import AddUserAndDoctor from "@/Context/AddUserAndDoctor";

const LayoutProviders = ({ children }: { children: React.ReactNode }) => {
    return (
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
                                                                <AddUserAndDoctor>
                                                                    {children}
                                                                </AddUserAndDoctor>
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
    )
}

export default LayoutProviders
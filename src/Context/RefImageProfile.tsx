import { createContext, useContext, useRef } from "react";

const ProfileImageRefContext = createContext<React.RefObject<HTMLInputElement | null> | null>(null);

export const ProfileImageRefProvider = ({ children }: { children: React.ReactNode }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null); 

    return (
        <ProfileImageRefContext.Provider value={fileInputRef}>
            {children}
        </ProfileImageRefContext.Provider>
    );
};

export const useProfileImageRef = () => {
    const context = useContext(ProfileImageRefContext);
    if (!context) {
        throw new Error("useProfileImageRef must be used within a ProfileImageRefProvider");
    }
    return context;
};

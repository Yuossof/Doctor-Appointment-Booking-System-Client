'use client';
import { IUser } from '@/types/UserInformation';
import { useEffect, useState } from 'react'
import GetToken from '../auth/GetToken';
import axios from 'axios';
import { useRefresh } from '@/Context/RefreshAdmin';
import { useSearchName } from '@/Context/SearchName';

export default function UseDoctors() {
    const [doctors, setDoctors] = useState<IUser[] | []>([]);
    const refreshContext = useRefresh();
    const searchNameContext = useSearchName();

    useEffect(() => {
        const getDoctors = async () => {
            const token = await GetToken();
            try{
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/doctors?name=${searchNameContext?.searchName}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setDoctors(res.data.data.doctors);
            } catch(error){
                if(axios.isAxiosError(error)){
                    console.log(error);
                }
            }
        }
        getDoctors();
    }, [refreshContext?.refresh, searchNameContext?.searchName]);

  return doctors;
}

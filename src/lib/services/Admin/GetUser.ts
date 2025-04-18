'use client';
import { IUser } from '@/types/UserInformation';
import { useEffect, useState } from 'react'
import GetToken from '../auth/GetToken';
import axios from 'axios';
import { useRefresh } from '@/Context/RefreshAdmin';
import { useSearchName } from '@/Context/SearchName';

export default function UseUsers() {
    const [users, setUsers] = useState<IUser[] | []>([]);
    const refreshContext = useRefresh();
    const searchNameContext = useSearchName();

    useEffect(() => {
        const getUsers = async () => {
            const token = await GetToken();
            try{
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users?name=${searchNameContext?.searchName}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUsers(res.data.data.users);
            } catch(error){
                if(axios.isAxiosError(error)){
                    console.log(error);
                }
            }
        }
        getUsers();
    }, [refreshContext?.refresh, searchNameContext?.searchName]);

  return users;
}

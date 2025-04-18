'use client';
import { useEffect, useState } from 'react'
import GetToken from '../auth/GetToken';
import axios from 'axios';
import { useSearchName } from '@/Context/SearchName';
import { useRefresh } from '@/Context/RefreshAdmin';

interface Specialization {
    id: number,
    name_en: string,
    is_deleted: string
}

export default function UseSpecializations() {
    const [specializations, setSpecializations] = useState<Specialization[] | []>([])
    const searchNameContext = useSearchName();
    const refreshContex = useRefresh();

    useEffect(() => {
        const getSecializations = async () => {
            const token = await GetToken();
            try {
                console.log(searchNameContext?.searchName)
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/specializations?name=${searchNameContext?.searchName}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setSpecializations(res.data.data.specializations);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error);
                }
            }
        }
        getSecializations();
    }, [searchNameContext?.searchName, refreshContex?.refresh]);

    return specializations;
}

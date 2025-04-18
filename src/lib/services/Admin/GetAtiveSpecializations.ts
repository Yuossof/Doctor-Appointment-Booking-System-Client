'use client';
import { useEffect, useState } from 'react'
import GetToken from '../auth/GetToken';
import axios from 'axios';

interface Specialization {
    id: number,
    name_en: string,
    is_deleted: string
}

export default function UseActiveSpecializations() {
    const [specializations, setSpecializations] = useState<Specialization[] | []>([])

    useEffect(() => {
        const getSecializations = async () => {
            const token = await GetToken();
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/specializations/active`, {
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
    }, []);

    return specializations;
}

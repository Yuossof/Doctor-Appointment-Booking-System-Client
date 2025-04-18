import { useState, useEffect } from 'react';
import axios from 'axios';
import GetToken from '@/lib/services/auth/GetToken';
import { IAdminDashboardData } from '@/types/Admin/Dashboard';
import { useRefresh } from '@/Context/RefreshAdmin';

const useDashboardData = () => {
    const [data, setData] = useState<IAdminDashboardData | null>(null);
    const refreshContext = useRefresh();

    useEffect(() => {
        const getData = async () => {
            const token = await GetToken();
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(res.data.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error?.response?.data);
                }
            }
        };

        getData();
    }, [refreshContext?.refresh]);

    return data;
};

export default useDashboardData;

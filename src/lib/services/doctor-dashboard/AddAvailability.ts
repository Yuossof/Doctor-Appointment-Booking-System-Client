import axios from "axios";
import GetToken from "../auth/GetToken";

export const GetUsers = async () => {
    const token = await GetToken()
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments/store`,
            {
                date: "2025-03-20",
                time: "14:00",
                doctorId: 123
            }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data
    } catch (error) {
        console.error("Error fetching data!", error);

    }
}
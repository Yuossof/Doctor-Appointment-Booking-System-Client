import axios from "axios";
import GetToken from "../auth/GetToken";

interface DataProps {
    type: string;
    desc: string;
    user_id: string | number
}

export const updateDoc = async (data: DataProps, reportID: string | number) => {
    const token = await GetToken()
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/documentations/update/${reportID}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res.data)
    } catch (error) {
        console.error("Error fetching data!", error);

    }
}

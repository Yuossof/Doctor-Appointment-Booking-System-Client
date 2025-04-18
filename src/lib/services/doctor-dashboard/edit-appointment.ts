import axios from "axios";
import GetToken from "../auth/GetToken";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editAppointment = async (id: string | number, data: any) => {
    const token = await GetToken()
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/appointments/update/${id}`,{...data, day_id: 1}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res.data)
    } catch (error) {
        console.error("Error fetching data!", error);

    }
}

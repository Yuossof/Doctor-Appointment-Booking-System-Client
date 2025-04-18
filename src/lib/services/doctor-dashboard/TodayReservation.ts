import axios from "axios";
import GetToken from "../auth/GetToken";

export const completeReservation = async (id:number) => {
    const token = await GetToken()
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/reservations/complete_reservations/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res.data)
    } catch (error) {
        console.error("Error fetching data!", error);
    }
}


export const cancelReservation = async (id:number) => {
    const token = await GetToken()
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/reservations/cancel_reservations/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res.data)
    } catch (error) {
        console.error("Error fetching data!", error);
    }
}
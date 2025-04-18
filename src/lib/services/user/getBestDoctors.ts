import axios from "axios";
import GetToken from "../auth/GetToken";

export const GetBestDoctors = async () => {
    const token = await GetToken()
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/get-doctors/best-specialization-doctor`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res.data.data)
       return res.data
    } catch (error) {
        console.error("Error fetching data!", error);

}}
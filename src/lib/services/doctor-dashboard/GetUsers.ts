import axios from "axios";
import GetToken from "../auth/GetToken";

export const GetUsers = async () => {
    const token = await GetToken()
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res.data.data)
       return res.data.data.users
    } catch (error) {
        console.error("Error fetching data!", error);

}}
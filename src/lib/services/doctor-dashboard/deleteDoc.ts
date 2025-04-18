import axios from "axios";
import GetToken from "../auth/GetToken";


export const deleteDoc = async (reportID: string | number) => {
    const token = await GetToken()
    try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/documentations/delete/${reportID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res.data)
    } catch (error) {
        console.error("Error fetching data!", error);

    }
}

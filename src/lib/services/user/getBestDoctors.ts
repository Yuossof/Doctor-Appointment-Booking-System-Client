import axios from "axios";

export const GetBestDoctors = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/get-doctors/best-specialization-doctor`);
        console.log(res.data)
        return res.data.data.topDoctors
       
    } catch (error) {
        console.error("Error fetching data!", error);

}}
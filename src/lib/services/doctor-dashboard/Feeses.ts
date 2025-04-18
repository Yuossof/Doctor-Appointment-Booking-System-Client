import axios from "axios";
import GetToken from "../auth/GetToken";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addFeese = async (price: number, count_review: any) => {
    const token = await GetToken()
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/feeses/store`,
            {
                price,
                count_review
            }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data.errors.error;
        } else {
            return "An unknown error occurred";
        }
    }
}


export const editFeese = async (price: number, count_review: string, id:number) => {
    const token = await GetToken()
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/feeses/${id}`,
            {
                price,
                count_review
            }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res.data)
    } catch (error) {
        console.error("Error fetching data! , post", error);

    }
}


export const getFeeses = async () => {
    const token = await GetToken()
    console.log(token)
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/feeses`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("ddd",res.data)
        return res.data.data.feeses
    } catch (error) {
        console.error("Error fetching data!, get", error);

    }
}


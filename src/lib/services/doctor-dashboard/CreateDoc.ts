// import axios from "axios";
// import GetToken from "../auth/GetToken";
// import { GetUser } from "../auth/GetUser";

// export const createDoc = async () => {
//     const user = await GetUser()
//     const token = await GetToken()
//     try {
//         const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/appointments/store`,
//             {
//                 type: "",
//                 desc: "",
//                 doctor_id: user.id,
//                 user_id: 
//             }, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         return res.data
//     } catch (error) {
//         console.error("Error fetching data!", error);

//     }
// }

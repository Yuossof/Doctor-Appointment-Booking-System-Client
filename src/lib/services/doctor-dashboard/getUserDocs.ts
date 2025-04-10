import GetToken from "../auth/GetToken";

export const GetUserDocs = async () => {
    const token = await GetToken();
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/users/${12}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json();
        return data.data.user.user_docs
        // return data.data.docs;
    } catch(error) {
        console.log(error)
    }
}

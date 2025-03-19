import GetToken from '@/lib/services/auth/GetToken'

export const GetUserReservation = async () => {
    const token = await GetToken();
    try{
        const res = await fetch(`${process.env.NEXT_BASE_URL}/api/users/reservations`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await res.json();
        return data.data.reservations;
    } catch(error){
        console.log(error)
    }
} 

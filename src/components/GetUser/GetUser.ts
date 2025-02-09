import { cookies } from 'next/headers'

export const  GetUser = async () =>  {
    const data = (await cookies()).get('data')?.value;
    const user = data ? JSON.parse(data).user : null;
    return user;
}

'use server'
import { cookies } from 'next/headers';

export default async function GetToken() {
        const data = (await cookies()).get('data')?.value;
        const token = data ? JSON.parse(data).token : null;
        return token;
}

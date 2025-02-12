import GetToken from '../GetToken/GetToken';

export const GetDoctors = async () => {
    try{
        const res = await fetch('http://localhost:8000/api/users/get-doctors?page=1',{
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const data = await res.json();
        return data.data.doctors.data;
    } catch(error){
        console.log(error);
    }
}

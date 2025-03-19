import GetToken from './GetToken'

export const SendCode = async () => {
    const token = await GetToken();
    try{
        await fetch(`https://clinic.divstark.com/api/users/send-code`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    } catch(error){
        console.log(error)
    }
}

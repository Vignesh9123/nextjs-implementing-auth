import { cookies } from 'next/headers';

export const getLoggedIn = ()=>{
    return cookies().has("token")
}
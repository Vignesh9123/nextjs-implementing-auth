import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers';

export const getDataFromToken = async(request)=>{
    try {
        const token = cookies().get('token').value
        console.log("get data token",token);
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET)
        return decodedToken.id
    } catch (error) {
        
    }
}
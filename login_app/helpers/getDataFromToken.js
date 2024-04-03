import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export const getDataFromToken = async(request)=>{
    try {
        const  {token} = await request.json()
        const decodedToken = jwt.verify(token,process.env.TOKEN_SECRET)
        return decodedToken.id
    } catch (error) {
        
    }
}
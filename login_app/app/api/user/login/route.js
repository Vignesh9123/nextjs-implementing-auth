import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcrypt"
import User from "@/models/userSchema";
import { NextResponse,NextRequest } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers'

connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody
        //TODO: Use validation here using zod/etc
        console.log(reqBody);
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({message:"User does not exist"},{status:400})
        }
        const matchedPassword = await bcrypt.compare(password,user.password)
        if(!matchedPassword){
            return NextResponse.json({message:"Invalid credentials"},{status:400})
        }

        const tokenPayload = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token = await jwt.sign(tokenPayload,process.env.TOKEN_SECRET,{expiresIn:'1d'})
        const response =  NextResponse.json({message:"Logged in success",success:true})
        const res = new NextResponse()
        // response.cookies.set("token",token,{
        //     httpOnly:true
        // })
        cookies().set('token', token)
        console.log("backend token",cookies().get('token'))
        return response
        

    } catch (error) {
        return NextResponse.json({error})
    }
}
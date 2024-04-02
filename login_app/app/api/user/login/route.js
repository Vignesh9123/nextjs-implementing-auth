import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcrypt"
import User from "@/models/userSchema";
import { NextResponse,NextRequest } from "next/server";
import jwt from "jsonwebtoken"
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
        const response = await NextResponse.json({message:"Logged in success",success:true})
        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response

    } catch (error) {
        
    }
}
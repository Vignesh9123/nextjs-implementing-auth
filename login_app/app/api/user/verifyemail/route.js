import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcrypt"
import User from "@/models/userSchema";
import { sendEmail } from "@/helpers/mailer";
import { NextResponse,NextRequest } from "next/server";
connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        if(!token){
            return NextResponse.json({error:"No token"},{status:400})
        }
        const user = await User.findOne({verifyToken:token,
            verifyTokenExpiry:{$gt:Date.now()} //Checks whether the verifyTokenExpiry is greater than the current date
        })
        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:400}) 
        }
        console.log(user);
        await User.findByIdAndUpdate(user._id,{
            $set:{
                isVerified:true, //typo
                verifyToken:null,
                verifyTokenExpiry:null
            }
        })
        // console.log("updated",updatedUser);
        return NextResponse.json({"message":"Email verified successfully","success":true},{status:200})
    } catch (error) {
       return NextResponse.json({error:error.message},{status:500})  
    }
}
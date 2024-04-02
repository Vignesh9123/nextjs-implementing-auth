import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcrypt"
import User from "@/models/userSchema";
import { sendEmail } from "@/helpers/mailer";
connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {username, email,password} = reqBody
        //TODO: Use validation here using zod/etc
        console.log(reqBody);
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({message:"User already exists"},{status:400})
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const savedUser = await User.create({
            username,email,password:hashedPassword
        })
        console.log(savedUser);
        //Send verification email
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

        return NextResponse.json({message:"User registered succesfully",
        success:true,
        savedUser
    })
    } catch (error) {
        return NextResponse.json({message:error},{status:400}) 
    }
}
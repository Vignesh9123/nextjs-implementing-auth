import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcrypt"
import User from "@/models/userSchema";
import { sendEmail } from "@/helpers/mailer";
connect()

export async function GET(){
    try {
        const response = NextResponse.json({message:"Log out success",success:true})
        console.log(response.cookies.get("token"));
        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })
        return response
    } catch (error) {
        return NextResponse.json({message:error.message},{success:false})
    }
}
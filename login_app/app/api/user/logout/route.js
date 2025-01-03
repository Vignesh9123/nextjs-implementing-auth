import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcrypt"
import User from "@/models/userSchema";
import { sendEmail } from "@/helpers/mailer";
import { cookies } from 'next/headers'

connect()

export async function GET(){
    try {
        const response = NextResponse.json({message:"Log out success",success:true})
        cookies().delete('token')
        return response
    } catch (error) {
        return NextResponse.json({message:error.message},{success:false})
    }
}
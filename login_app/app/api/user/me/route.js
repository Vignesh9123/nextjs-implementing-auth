import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userSchema";
connect()

export async function POST(request){
    try {
        //extracting token from cookies and extract id from token
        const userId = await getDataFromToken(request)
        const user = await User.findOne({_id:userId}).select("-password")
        if(!user){
            return NextResponse.json({message:"Invalid Token"},{status:400})
        }
        return NextResponse.json({"message":"user found",user})
    } catch (error) {
     return NextResponse.json({"message":error.message},{status:500})   
    }
}
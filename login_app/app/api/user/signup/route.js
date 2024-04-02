import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userSchema";
export async function POST(request){
    try {
        const reqbody = await request.json()
        
    } catch (error) {
        
    }
}
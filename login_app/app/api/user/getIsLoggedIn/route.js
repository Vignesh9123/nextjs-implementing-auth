import { getLoggedIn } from '@/helpers/userLoggedIn'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(){
    try {
        const login = getLoggedIn()
      
        return NextResponse.json({login})
    } catch (error) {
        return NextResponse.json({message:error.message},{success:false})
    }
}
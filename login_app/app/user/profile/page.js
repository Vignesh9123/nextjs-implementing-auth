"use client";
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";
import {toast,Toaster} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const awaitDelay = ()=>{
        return new Promise((resolve)=>{
            setTimeout(() => {
                resolve()
                return
            }, 1300);
        })
    }

    const logout = async () => {
        try {
            await axios.get('/api/user/logout')
            localStorage.removeItem("token")
            toast.success('Logout successful')
            router.push('/user/login')

        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        try {
            const res = await axios.post('/api/user/me')
            console.log(res.data);
            setData(res.data.user._id)
        } catch (error) {
            console.log("Details fetch failed", error.message);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster/>
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/user/profile/${data}`}>{data}
            </Link>}</h2>
        <hr />
        <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>

        <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>
            </div>
    )
}
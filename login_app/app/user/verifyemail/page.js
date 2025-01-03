"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {toast,Toaster} from "react-hot-toast";


export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/user/verifyemail', {token})
            setVerified(true);
            toast.success("Email verified successfully, you can now login to your account")
        } catch (error) {
            setError(true);
            console.log(error);
            
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1].replaceAll("%24","$").replace("%2F","/");
        console.log(urlToken);
        setToken((urlToken) || "");
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Toaster/>
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <Link href="/user/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
                </div>
            )}
        </div>
    )

}
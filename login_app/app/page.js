"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(()=>{
    (async()=>{
      const res = await fetch("/api/user/getIsLoggedIn")
      const resp = await res.json()
      setLoggedIn(resp.login)
    })()
  },[])
  return (<>
   <div>Home</div>
   {loggedIn ? <Link href="/user/profile">Sign out</Link>:<Link href="/user/login">Sign in</Link>}
   </>
  );
}

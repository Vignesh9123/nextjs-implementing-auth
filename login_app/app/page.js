"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loaded, setLoaded] = useState(false)
  useEffect(()=>{
    (async()=>{
      setLoaded(false)
      const res = await fetch("/api/user/getIsLoggedIn")
      const resp = await res.json()
      setLoggedIn(resp.login)
      setLoaded(true)
    })()
  },[])
  return (<>
   <div>Home</div>

   {loaded &&loggedIn ? <Link href="/user/profile">Sign out</Link>:<Link href="/user/login">Sign in</Link>}
   </>
  );
}

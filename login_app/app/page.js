"use client"
import { useEffect, useState } from "react";
export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(()=>{
    (async()=>{
      const res = await fetch("/api/user/getIsLoggedIn")
      const resp = await res.json()
      console.log(resp);
    })()
  },[])
  return (<>
   <div>Home</div>
   {loggedIn ? <div>Sign out</div>:<div>Sign in</div>}
   </>
  );
}

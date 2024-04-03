"use client"
import { useEffect, useState } from "react";
import { cookies } from "next/headers";
export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(()=>{
    setLoggedIn(cookies().has("token"))
  })
  return (<>
   <div>Home</div>
   {loggedIn ? <div>Sign out</div>:<div>Sign in</div>}
   </>
  );
}

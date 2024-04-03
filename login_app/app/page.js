"use client"
import { getLoggedIn } from "@/helpers/userLoggedIn";
import { useEffect, useState } from "react";
export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(()=>{
    setLoggedIn(getLoggedIn)
  })
  return (<>
   <div>Home</div>
   {loggedIn ? <div>Sign out</div>:<div>Sign in</div>}
   </>
  );
}

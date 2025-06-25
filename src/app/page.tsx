
import { useState } from "react"
import { LandingPage } from "@/components/landing-page"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"


export default async function Home() {
  
  const session = await auth.api.getSession({
    headers: await headers()
  })


  // if (!session) {
    return <LandingPage loggedIn={!!session} />
  // }
}

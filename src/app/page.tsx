"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [name, setName] = useState("");
   const handleSignIn = async () => {
      const { data, error } = await authClient.signUp.email({
         name,
         email,
         password,
         callbackURL: "/dashboard",
      }, {
        onError: (error) => {
            console.error(error.error.message);
        },
        onSuccess: (data) => {
            console.log(data);
        },
        onRequest: (request) => {
            console.log(request);
        },
      });
      console.log(data);
   };

   return (
      <div>
         <h1 className="text-2xl font-bold text-primary">Hello World</h1>
         <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
         />
         <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         />
         <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
         <button onClick={() => handleSignIn()}>Sign In</button>
      </div>
   );
}

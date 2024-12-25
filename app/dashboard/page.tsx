"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthGuard } from "../lib/AuthGuard";
import { signOut } from "next-auth/react";

export default function(){
    const [timeDuration, setTimeDuration] = useState(0)
    const router = useRouter()

    const handleStartGame = () => {
        if (timeDuration > 0){
            router.push(`/game?duration=${timeDuration}`)
        }else{
            alert('Please select a timer!')
        }
    }

    return (
        <AuthGuard>
            <div className="py-2">
                <button onClick={() => setTimeDuration(1)} className="bg-white text-black">1 minute</button>
            </div>
            <div className="py-2">
                <button className="bg-white text-black" onClick={() => setTimeDuration(3)}>3 minute</button>
            </div>
            <div className="py-2">
                <button className="bg-white text-black" onClick={() => setTimeDuration(5)}>5 minute</button>
            </div>
            <div className="py-2">
                <button onClick={handleStartGame} className="bg-white text-black">Start</button>
            </div>
            <div className="py-2">
                <button onClick={() => signOut()} className="bg-white text-black">Sign Out</button>
            </div>
        </AuthGuard>
    )
}
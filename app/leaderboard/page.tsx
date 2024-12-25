"use client"

import { useEffect, useState } from "react"

type LeaderboardEntry = {
    name: string,
    email: string,
    image: string,
    highestScore: number,
}

export default function LeaderBoard(){
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLeaderboard(){
            try{
                const res = await fetch("/api/leaderboard");
                if(res.ok){
                    const data = await res.json()
                    setLeaderboard(data)
                }else{
                    console.log("fetch to load leader board")
                }
            }catch(e){  
                console.log("Error fetching leaderboard:", e)

            }finally{
                setLoading(false)
            }
        }
        fetchLeaderboard()
    }, [])

    if (loading){
        return <div>Loading leaderboard...</div>
    }

    return (
        <>
            <div>
                <h1 className="text-2xl">LeaderBoard</h1>
                <table className="table-auto w-full border-collapse border border-gray-400">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="text-black border border-gray-400 px-4 py-2">Rank</th>
                            <th className="border text-black border-gray-400 px-4 py-2">Player</th>
                            <th className="border text-black border-gray-400 px-4 py-2">HighestScore</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.map((entry, index) => (
                            <tr key={entry.email} className="text-center">
                                <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-400 px-4 py-2 flex items-center gap-2">
                                    <img
                                        src={entry.image}
                                        alt={entry.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                    {entry.name || "Anonymous"}
                                </td>
                                <td className="border border-gray-400 px-4 py-2">{entry.highestScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}
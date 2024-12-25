import { prismaClient } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const leaderboard = await prismaClient.user.findMany({
            orderBy: {
                highestScore: 'desc'
            }, 
            select: {
                name: true,
                email: true,
                image: true,
                highestScore: true,
            },
            take: 10
        })
        return NextResponse.json(leaderboard, { status: 200 })
    }catch(e){
        console.log("Error fetching leaderBoard", e)
        return NextResponse.json({
            error: "internal Error"
        },{
            status: 500
        })
    }
}
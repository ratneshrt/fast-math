import { authOptions } from "@/app/lib/auth";
import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        const session = await getServerSession(authOptions);
        if(!session || !session.user){
            return NextResponse.json({
                error: 'unathorized'
            }, {
                status: 401
            })
        }
        const { score } = await req.json();
        if (typeof score !== "number" || score < 0){
            return NextResponse.json({
                error: "Invalid input"
            }, {
                status: 400
            })
        }

        const user = await prismaClient.user.findUnique({
            where: {
                email: session.user.email || ""
            }
        })

        if (!user){
            return NextResponse.json({
                error: "User not found"
            })
        }

        if (score > user.highestScore){
            await prismaClient.user.update({
                where: {
                    email: session.user.email || ""
                },
                data: {
                    highestScore: score
                }
            })
        }

        return NextResponse.json({
            message: "Score updated successfully"
        }, {
            status: 200
        })

    }catch(e){
        console.log(e)
        return NextResponse.json({
            error: "Internal server error" + e
        }, {
            status:500
        })
    }
}
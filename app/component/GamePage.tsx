"use client"

import { useEffect, useState } from "react"
import { generateMathProblem } from "../component/mathProblem"
import { useTimer } from "../hooks/useTimer"
import { useRouter, useSearchParams } from "next/navigation"

type GameProps = {
    creatorId: string
}

export function GamePage({creatorId}:GameProps){
    const [problem, setProblem] = useState({ question: '', answer: 0 })
    const [streak, setStreak] = useState(0)
    const [userAnswer, setuserAnswer] = useState('')
    const [score, setScore] = useState(0)
    const router = useRouter()
    const search = useSearchParams();
    const durationParam = search.get("duration");
    const duration = parseInt(durationParam || "0");

    const timeLeft = useTimer(duration * 60, async () => {
        alert(`Your Times Up! Your final score is ${score}`);

        try{
            const res = await fetch('/api/score', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({ score })
            })

            const result = await res.json()

            if (res.ok){
                console.log("Score updated Successfully")
            } else{
                console.log("failed to update score")
            }
        }catch(e){
            console.log('Error updating Score', e)
        }

        router.push('/dashboard');
    })

    useEffect(() => {
        setProblem(generateMathProblem(0))
    }, [])

    const handleInput = (value: string) => {
        setuserAnswer(value)
        const numericAnswer = parseInt(value)
        if(!isNaN(numericAnswer) && numericAnswer === problem.answer){
            setTimeout(() => {
                setProblem(generateMathProblem(streak + 1));
                setScore(score + 1 + Math.floor(streak/3))
                setStreak(streak + 1);
                setuserAnswer('');
            }, 500)
        } else if (value.length >= problem.answer.toString().length){
            setTimeout(() => {
                alert('wrong answer')
                setStreak(0);
                setuserAnswer('')
            }, 500)
        }
    }

    return (
        <>
            <div>
                <div className="text-4xl">
                    Question: {problem.question}
                </div>
                <div className="p-2">
                    <input className="text-black" value={userAnswer} placeholder="Enter your answer" onChange={(e) => handleInput(e.target.value)}/>
                </div>
                <div>
                    Streak: {streak}
                </div>
                <div>
                    Score: {score}
                </div>
                <div>
                    Time Left: {timeLeft}
                </div>
                {creatorId}
            </div>
        </>
    )
}
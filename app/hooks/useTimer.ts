import { useState, useEffect } from "react";

export function useTimer(duration: number, onTimesUp: () => void){
    const [timeLeft, setTimeLeft] = useState(duration)

    useEffect(() => {
        if(timeLeft<=0){
            onTimesUp();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevtime) => prevtime - 1)
        }, 1000)

        return () => clearInterval(timer);
    }, [timeLeft, onTimesUp])

    return timeLeft;
}
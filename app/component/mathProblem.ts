import { evaluate } from 'mathjs'

type MathProblem = {
    question: string,
    answer: string
}
export const generateMathProblem = (streak: number) => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)]
    
    const range = Math.min(streak + 5, 100)

    let num1 = Math.floor(Math.random() * range) + 1
    let num2 = Math.floor(Math.random() * range) + 1

    let question = `${num1} ${operation} ${num2}`
    let answer = evaluate(question)

    return { question, answer }
}
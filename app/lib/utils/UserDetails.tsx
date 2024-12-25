
import { getServerSession } from "next-auth"

export default async function UserDetail(){
    const session = await getServerSession()
    return (
        <>
            {session?.user.email}<br></br>
            {session?.user.name}<br></br>
            {session?.user.image}<br></br>
        </>
    )
}
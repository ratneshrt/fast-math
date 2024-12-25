import { getServerSession } from "next-auth";
import { GamePage } from "../component/GamePage";
import { authOptions } from "../lib/auth";

export default async function Game(){
    const session = await getServerSession(authOptions);

    return (
        <>  
            <GamePage creatorId={session?.user.id || ""}></GamePage>
        </>
    )
}

import Conatiner from "../basicComponents/container"
import { FriendsContainer, SuggestionsContainer } from "./followers"


const FriendsSuggestionContainer = ()=>{
      // Recalculate friends and suggestions whenever currentUserProfile or allProfiles update.
    return (
        <Conatiner className="w-full h-full flex flex-col justify-start items-center gap-2 overflow-y-scroll rounded-xl bg-zinc-900/70">
            <FriendsContainer/>
            <SuggestionsContainer />
        </Conatiner>
    )
}

export default FriendsSuggestionContainer;
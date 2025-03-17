import { getAllProfiles } from "@/repository/profile.service";
import { ProfileSetup } from "@/types";

export const  fetchUsers_array = async ():Promise<{ users: ProfileSetup[]; errorMessage: string | null }>=>{
    let users:ProfileSetup[] = []
    let errorMessage:string | null= null
    try {
        const snapshot = await getAllProfiles();
        users = snapshot.docs.map((doc) => doc.data() as ProfileSetup);
    } catch (error: any) {
        errorMessage=error.message ;
    }
    return {users,errorMessage};
}

export const getFriends = (currentUserId:string,following:string[],allUsers:ProfileSetup[])=>{
    return allUsers.filter((user)=>(
        currentUserId!==user.userId && following.includes(user.userId)
    ));
}
export const getSuggestions = (currentUserId:string,following:string[],allUsers:ProfileSetup[])=>{
    return allUsers.filter((user)=>(
        currentUserId!==user.userId && !following.includes(user.userId)
    ));
}
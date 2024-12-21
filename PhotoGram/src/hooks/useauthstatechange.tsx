import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebaseConfig";

function useAuthStateChange(){
    const [user,setUser] = useState<User|null>(null);
    const [loading,setLoading] = useState<boolean>(true);
    useEffect(()=>{
            // onAuthStateChanged is return a fuction is used for cleanup
            const unSubcribe = onAuthStateChanged(auth,(user)=>{
                if(user){
                    setUser(user);
                }
                else{
                    setUser(null);
                }
                setLoading(false);
            });
            return ()=>{
                unSubcribe();
            }
        },[]);
    return {user,loading};
}

export default useAuthStateChange;
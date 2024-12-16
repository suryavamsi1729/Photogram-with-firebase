import { useContext, useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User, signInWithRedirect } from "firebase/auth";
import { createContext} from "react";

interface IUserAuthProvider {
    children : React.ReactNode,
}

type AuthContextData = {
    user: User | null,
    logIn : typeof logIn,
    signUp : typeof signUp,
    logOut : typeof logOut,
    googleSignIn : typeof googleSignIn,
}

const logIn = (email:string,password:string)=>{
    return signInWithEmailAndPassword(auth,email,password);
}

const signUp =  (email:string,password:string)=>{
    return createUserWithEmailAndPassword(auth,email,password);
}

const logOut = ()=>{
    signOut(auth);
}

const googleSignIn = () =>{
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth,googleAuthProvider);
}

export const userAuthContext = createContext<AuthContextData>({
    user:  null,
    logIn,
    signUp,
    logOut,
    googleSignIn,
});

export const UserAuthProvider : React.FC<IUserAuthProvider> = ({children})=>{
    const [user,setUser] = useState<User | null>(null);
    // console.log(user);
    useEffect(()=>{
        // onAuthStateChanged is return a fuction is used for cleanup
        const unSubcribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user);
            }
            
        });
        return ()=>{
            unSubcribe();
        }
    },[]);
    const value:AuthContextData = {
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
    }
    return (
        <userAuthContext.Provider value={value}>
            {
                children
            }
        </userAuthContext.Provider>
    );
}
export const useUseAuth = () => useContext(userAuthContext);
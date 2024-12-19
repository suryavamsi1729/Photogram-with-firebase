import { useContext, useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword,sendPasswordResetEmail, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User,} from "firebase/auth";
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
    loading: boolean,
    setLoading : (loading:boolean)=>void,
    linkToResetPassword: typeof linkToResetPassword,
}


const logIn = (email:string,password:string)=>{
    return signInWithEmailAndPassword(auth,email,password);
}

const signUp =  (email:string,password:string)=>{
    return createUserWithEmailAndPassword(auth,email,password);
}

const logOut = ()=>{
    return signOut(auth);
}

const googleSignIn = () =>{
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth,googleAuthProvider);
}
 const linkToResetPassword = (email:string)=>{
    return sendPasswordResetEmail(auth,email);
 }

export const userAuthContext = createContext<AuthContextData>({
    user:  null,
    logIn,
    signUp,
    logOut,
    googleSignIn,
    loading: false,
    setLoading : ()=>{},
    linkToResetPassword,
});

export const UserAuthProvider : React.FC<IUserAuthProvider> = ({children})=>{
    const [user,setUser] = useState<User | null>(null);
    const [loading,setLoading] = useState <boolean> (false);
    // console.log(user);
    useEffect(()=>{
        // onAuthStateChanged is return a fuction is used for cleanup
        const unSubcribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user);
            }
            else{
                setUser(null);
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
        loading,
        setLoading,
        linkToResetPassword,
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
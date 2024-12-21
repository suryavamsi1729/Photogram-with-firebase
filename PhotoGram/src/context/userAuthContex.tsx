import { useContext, useState,useEffect } from "react";
import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword,sendPasswordResetEmail, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User, confirmPasswordReset, applyActionCode,} from "firebase/auth";
import { createContext} from "react";
import useAuthStateChange from "@/hooks/useauthstatechange";

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
    resetPassword : typeof resetPassword,
    verifyEmail : typeof verifyEmail,
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
    return sendPasswordResetEmail(auth,email,{url:"http://localhost:3000/reset-password",handleCodeInApp:true});
 }
const resetPassword = (oobcode:string,newpwd:string)=>{
    return confirmPasswordReset(auth,oobcode,newpwd);
}
const verifyEmail = (oobcode:string)=>{
    return applyActionCode(auth,oobcode);
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
    resetPassword,
    verifyEmail,
});

export const UserAuthProvider : React.FC<IUserAuthProvider> = ({children})=>{
    // const [user,setUser] = useState<User | null>(null);
    const {user} = useAuthStateChange();
    const [loading,setLoading] = useState <boolean> (false);
    const value:AuthContextData = {
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        loading,
        setLoading,
        linkToResetPassword,
        resetPassword,
        verifyEmail,
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
import { db } from "@/firebaseConfig";
import { User } from "@/types";
import {  doc, setDoc, updateDoc, } from "firebase/firestore";

//collection name
const COLLECTION_NAME = "users";

//collection reference
//const userRef = collection(db,COLLECTION_NAME);

//creating new User
const createUser = (user:User)=>{
    const docRef = doc(db,COLLECTION_NAME,user.userId);
    return setDoc(docRef,user);
}
const emailverified = (id:string)=>{
    const docRef = doc(db,"users",id);
    return updateDoc(docRef,{
        emailverified: true,
    });
}

export {createUser,emailverified };

import { db } from "@/firebaseConfig";
import { ProfileSetup } from "@/types";
import { arrayUnion, collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, } from "firebase/firestore";

//collection name
const COLLECTION_NAME = "profile";

//collection reference
const profileRef = collection(db,COLLECTION_NAME);

const createProfile = (profile:ProfileSetup)=>{
    const docRef = doc(db,COLLECTION_NAME,profile.userId);
    return setDoc(docRef,profile);
}
const getAllProfiles = ()=>{
    const q = query(profileRef,orderBy("status"));
    return getDocs(q);
}
const getProfile = (userId:string)=>{
    const docRef = doc(db,COLLECTION_NAME,userId );
    return getDoc(docRef);
}
const addFriend = (userId:string,friendId:string)=>{
    const docRef = doc(db,"profile",userId);
    return updateDoc(docRef,{
        following: arrayUnion(friendId)
    });
}

export {createProfile,getAllProfiles,getProfile,addFriend}
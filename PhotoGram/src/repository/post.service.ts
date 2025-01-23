import { db } from "@/firebaseConfig";
import { Post } from "@/types";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";

//collection Name
const COLLECTION_NAME = "posts";

//collection reference
const postsRef =  collection(db,COLLECTION_NAME);

//creating newpost
export const createPost = (post:Post)=>{
    return addDoc(postsRef,post);
}

//get all the post in db
export const getAllPosts = ()=>{
    const q = query(postsRef,orderBy("date"));
    return getDocs(q);
}

//get post by userid
export const getPostByUserId = (id:string)=>{
    const q = query(postsRef,where("userId", "==", id));
    return getDocs(q);
}

//get post by id
export const getPostById = (id:string) => {
    const docRef = doc(db,COLLECTION_NAME,id);
    return getDoc(docRef);
}

//delete post by the id
export const deletePost = (id:string) => {
    return deleteDoc(doc(db,COLLECTION_NAME,id));
}

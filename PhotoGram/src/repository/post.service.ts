import { db } from "@/firebaseConfig";
import { Post } from "@/types";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, startAfter, where, writeBatch } from "firebase/firestore";

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
    const q = query(postsRef,orderBy("date" , "desc"));
    return getDocs(q);
}
//get fist N post  in db
export const getFistNPosts = (N:number)=>{
    const q = query(postsRef,orderBy("date" , "desc"),limit(N));
    return getDocs(q);
}
//get next N post in db
export const getNextNPosts = (N:number,date:string,lastid:string,)=>{
    const q = query(postsRef,orderBy("date" , "desc"),orderBy("__name__","desc"),limit(N),startAfter(date, lastid),);
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

//deleting multiple file at atime by array of postids
export const deleteMultiplePosts = async (ids:string[]) => {
    try {
        const batch = writeBatch(db);

        ids.forEach((id:string) => {
            const docRef = doc(db, COLLECTION_NAME, id);
            batch.delete(docRef); // Add each document to the batch
        });

        // Commit the batch
        await batch.commit();
        console.log('Documents deleted successfully.');
    } catch (error) {
        console.error('Error deleting documents:', error);
    }
};
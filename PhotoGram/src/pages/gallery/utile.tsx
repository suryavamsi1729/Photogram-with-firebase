import { deleteMultiplePosts, getPostByUserId } from "@/repository/post.service";
import { Post, PostResponse } from "@/types";

//utility function for getting allPost using userid
export const getAllPostData = async(id:string): Promise<PostResponse[]> =>{
    try{
        const querySnapShot = await getPostByUserId(id);
        const tempArry:PostResponse[] = [];
        if(querySnapShot.size>0){
            querySnapShot.forEach((doc)=>{
                const data = doc.data() as Post;
                const responsObj : PostResponse = {
                    id:doc.id,
                    ...data,
                };
                tempArry.push(responsObj);
            });
            return tempArry;
        }
        else{
            console.log("no data");
            return [];
        }
    }
    catch(e){
        console.log(e);
    }
    return [];
}

//utility function for deleting multiple post uind their ids

export const handelMultipleDelets = async(selectedPosts:string[])=>{
    try {
        await deleteMultiplePosts(selectedPosts);//deleting posts by passing array of ids
    } catch (error) {
        console.log(error);
    }
}
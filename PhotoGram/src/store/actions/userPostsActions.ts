import { PostResponse } from "@/types";
import { postActionsTypes } from "../types"


export const fetchPostsRequest = ()=>{
    return {
        type:postActionsTypes.FETCH_POSTS_REQUEST
    };
}
export const fetchPostsSuccess = (posts:PostResponse[])=>{
    return {
        type:postActionsTypes.FETCH_POSTS_SUCCESS,
        payload:posts,
    };
}
export const fetchPostsFailure = (error:string)=>{
    return {
        type:postActionsTypes.FETCH_POSTS_FAILURE,
        payload:error
    };
}
export const togglePostFromSelectedPosts = (postId:string)=>{
    return {
        type:postActionsTypes.TOGGLEPOST_FROM_SELECTEDPOSTS,
        payload:postId,
    }
}
export const deletePostFromStore =(postId:string)=>{
    return{
        type:postActionsTypes.DELETE_POST,
        payload:postId,
    }
}
export const deletePostsFromStore =(postIds:string[])=>{
    return{
        type:postActionsTypes.DELETE_POSTS,
        payload:postIds,
    }
}
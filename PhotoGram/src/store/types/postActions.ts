import { PostResponse } from "@/types"

export enum postActionsTypes {
    FETCH_POSTS_FAILURE="FETCH_POSTS_FAILURE",
    FETCH_POSTS_REQUEST="FETCH_POSTS_REQUEST",
    FETCH_POSTS_SUCCESS="FETCH_POSTS_SUCCESS",
    TOGGLEPOST_FROM_SELECTEDPOSTS="TOGGLEPOST_FROM_SELECTEDPOSTS",
    DELETE_POST = "DELETE_POST",
    DELETE_POSTS = "DELETE_POSTS",
    ADDPOST_TO_SELECTEDPOSTS = "ADDPOST_TO_SELECTEDPOSTS",
    REMOVEPOST_TO_SELECTEDPOSTS = "REMOVEPOST_TO_SELECTEDPOSTS",
}

export interface fetchPostsFailureActionType {
    type:postActionsTypes.FETCH_POSTS_FAILURE,
    payload:string | null
}
export interface fetchPostsSuccessActionType {
    type:postActionsTypes.FETCH_POSTS_SUCCESS,
    payload:PostResponse[]
}
export interface fetchPostsRequestActionType {
    type:postActionsTypes.FETCH_POSTS_REQUEST,
}
export interface deletePostFromStoreActionType{
    type:postActionsTypes.DELETE_POST,
    payload:string
}
export interface deletePostsFromStoreActionType{
    type:postActionsTypes.DELETE_POSTS,
    payload:string[]
}
export interface addPostToSelectedPostsActionType {
    type:postActionsTypes.ADDPOST_TO_SELECTEDPOSTS,
    payload:string,
}
export interface removePostToSelectedPostsActionType {
    type:postActionsTypes.REMOVEPOST_TO_SELECTEDPOSTS,
    payload:string,
}
export interface togglePostFromSelectedPostsActionType {
    type:postActionsTypes.TOGGLEPOST_FROM_SELECTEDPOSTS,
    payload:string,
}
type PostActions = fetchPostsFailureActionType | fetchPostsRequestActionType | fetchPostsSuccessActionType | addPostToSelectedPostsActionType | togglePostFromSelectedPostsActionType  | removePostToSelectedPostsActionType | deletePostFromStoreActionType | deletePostsFromStoreActionType
export default PostActions;
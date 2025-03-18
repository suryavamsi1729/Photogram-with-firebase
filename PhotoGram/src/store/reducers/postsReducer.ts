import { IPostProfiles } from "@/types";
import  { postProfilesActionTypes } from "../types/postsActions";
import PostProfileActions from "../types/postsActions";

interface IPostsWithProfiles{
    loading:boolean,
    posts:IPostProfiles[],
    lastDoc:any,
    error: string,
}
const intialalue :IPostsWithProfiles = {
    loading:false,
    posts: [],
    lastDoc: null,
    error:""
}

const PostsReducer = (state:IPostsWithProfiles=intialalue,action:PostProfileActions)=>{
    switch (action.type) {
        case (postProfilesActionTypes.FETCH_REQUEST):
            return {...state,loading:true};
        case (postProfilesActionTypes.FETCH_SUCCESS):
            return {...state,loading:false,posts:[...action.payload.data],lastDoc:action.payload.lastDoc};
        case (postProfilesActionTypes.FETCH_NEXT_SUCCESS):
            return {...state,loading:false,posts:[...state.posts,...action.payload.data],lastDoc:action.payload.lastDoc}
        case (postProfilesActionTypes.FETCH_FAILURE):
            return {...state,loading:false,error:action.payload};
        
        default:
            return state;
    }
}


export default PostsReducer;
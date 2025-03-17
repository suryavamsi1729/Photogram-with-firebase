import { PostResponse } from "@/types";
import { PostActions, postActionsTypes } from "../types";

interface IPostsState{
    loading:boolean,
    posts: PostResponse[],
    selectedPosts: string[],
    errorMassege: String|null,
}

const intialValue:IPostsState = {
    loading:false,
    posts:[],
    selectedPosts:[],
    errorMassege:null
}

const UserPostReducer = (state: IPostsState = intialValue , action:PostActions)=>{
    let remingPosts:PostResponse[];
    switch (action.type) {
        
        case(postActionsTypes.FETCH_POSTS_REQUEST):
            return {...state,loading:true};
        case(postActionsTypes.FETCH_POSTS_SUCCESS):
            return{...state,posts:[...action.payload],loading:false}
        case(postActionsTypes.FETCH_POSTS_FAILURE):
            return{...state,loading:false,errorMassege:action.payload}
        case(postActionsTypes.TOGGLEPOST_FROM_SELECTEDPOSTS):
            const seletedPosts = state.selectedPosts;
            if(seletedPosts.some((postId)=>postId===action.payload)){
                const newSelectedPosts = seletedPosts.filter((postId)=>postId!==action.payload);
                return {...state,selectedPosts:newSelectedPosts};
            }
            else{
                return {...state,selectedPosts:[...state.selectedPosts,action.payload]};
            }
        case(postActionsTypes.DELETE_POST):
            const updatedSeletedPosts = state.selectedPosts.filter((id)=>id!==action.payload);
            const updatedPosts = state.posts.filter((post)=>post.id!==action.payload);
            return {...state,posts:[...updatedPosts],selectedPosts:[...updatedSeletedPosts]};
        case(postActionsTypes.DELETE_POSTS):
            remingPosts = state.posts.filter((post)=>!action.payload.includes(post.id));
            return {...state,posts:[...remingPosts],selectedPosts:[]};
        default:
            return state
    }
}

export default UserPostReducer;
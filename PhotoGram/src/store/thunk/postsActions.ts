
import { getAllPostData } from "@/pages/gallery/utile";
import { fetchPostsFailure, fetchPostsRequest, fetchPostsSuccess } from "../actions"
import { AppDispatch } from "../reducers";

export const fetchPosts  = (userId:string)=>{
    return async (dispatch:AppDispatch)=>{
        dispatch(fetchPostsRequest());
        try {
            const data = await getAllPostData(userId);
            dispatch(fetchPostsSuccess(data));
        } catch (error:any) {
            dispatch(fetchPostsFailure(error.message));
        }
    }
}
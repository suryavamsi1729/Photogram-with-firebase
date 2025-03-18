
import { fetchNextPostProfilesSuccess, fetchpostProfilesFailure, fetchpostProfilesRequest, fetchpostProfilesSuccess } from "../actions/postsActions";
import { AppDispatch } from "../reducers";
import { getAllPostWithProfiles, getNextPostWithProfiles } from "@/lib/api";



export const fetchPostsProfiles  = (n:number)=>{
    return async (dispatch:AppDispatch)=>{
        dispatch(fetchpostProfilesRequest());
        try {
            const {post,lastDoc} = await getAllPostWithProfiles(n);
            dispatch(fetchpostProfilesSuccess(post,lastDoc ));
        } catch (error:any) {
            dispatch(fetchpostProfilesFailure(error.message));
        }
    }
}

export const fetchNextPostsProfiles = (n:number,date:string,lastid:string)=>{
    return async (dispatch:AppDispatch)=>{
        dispatch(fetchpostProfilesRequest());
        try {
            const {post,lastDoc} = await getNextPostWithProfiles(n,date,lastid);
            dispatch(fetchNextPostProfilesSuccess(post,lastDoc ));
        } catch (error:any) {
            dispatch(fetchpostProfilesFailure(error.message));
        }
    }
}
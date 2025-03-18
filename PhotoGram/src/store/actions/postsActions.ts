
import { IPostProfiles} from "@/types"
import { postProfilesActionTypes } from "../types/postsActions";


//action creators 
export const fetchpostProfilesRequest = ()=>{
    return {
        type:postProfilesActionTypes.FETCH_REQUEST
    };
}

export const fetchpostProfilesSuccess = (data:IPostProfiles[],lastDoc:string)=>{
    return {
        type:postProfilesActionTypes.FETCH_SUCCESS,
        payload:{data:data,lastDoc:lastDoc}
    };
}
export const fetchNextPostProfilesSuccess = (data:IPostProfiles[],lastDoc:string)=> {
    return {
        type:postProfilesActionTypes.FETCH_NEXT_SUCCESS,
        payload: {data:data,lastDoc:lastDoc}
    };
}

export const fetchpostProfilesFailure = (error:string)=>{
    return {
        type:postProfilesActionTypes.FETCH_FAILURE,
        payload:error
    };
}

export const setLastDoc = (lastdoc:any)=>{
    return{
        type:postProfilesActionTypes.SET_LASTDOC,
        payload:lastdoc
    };
}

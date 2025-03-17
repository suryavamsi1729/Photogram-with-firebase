import { userActionTypes } from "../types"
import { ProfileSetup } from "@/types"


//action creators 
export const fetchUserRequest = ()=>{
    return {
        type:userActionTypes.FETCH_USER_REQUEST
    };
}

export const fetchUserSuccess = (data:ProfileSetup)=>{
    return {
        type:userActionTypes.FETCH_USER_SUCCESS,
        payload:data
    };
}

export const fetchUserFailure = (error:string)=>{
    return {
        type:userActionTypes.FETCH_USER_FAILURE,
        payload:error
    };
}

export const deleteUser = ()=>{
    return {
        type:userActionTypes.DELETE_USER,
    }
}

export const addToFollowing = (userId:string)=>{
    return {
        type:userActionTypes.ADD_FRIEND,
        payload:userId,
    }
}

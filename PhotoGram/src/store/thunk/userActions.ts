import { getProfile } from "@/repository/profile.service";
import { fetchUserFailure, fetchUserRequest, fetchUserSuccess } from "../actions"
import { AppDispatch } from "../reducers";
import { ProfileSetup } from "@/types";

export const fetchUser  = (userId:string)=>{
    return async (dispatch:AppDispatch)=>{
        dispatch(fetchUserRequest());
        try {
            const data = await getProfile(userId);
            dispatch(fetchUserSuccess(data.data() as ProfileSetup));
        } catch (error:any) {
            dispatch(fetchUserFailure(error.message));
        }
    }
}
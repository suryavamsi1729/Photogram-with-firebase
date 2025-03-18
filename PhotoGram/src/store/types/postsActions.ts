import { IPostProfiles } from "@/types";

export  enum postProfilesActionTypes {
    FETCH_REQUEST = "FETCH_REQUEST",
    FETCH_SUCCESS = "FETCH_SUCCESS",
    FETCH_FAILURE = "FETCH_FAILURE",
    FETCH_NEXT_SUCCESS = "FETCH_NEXT_SUCCESS",
    SET_LASTDOC = "SETLAST_DOC"
}

export interface FetchpostProfilesRequestActionType {
    type:postProfilesActionTypes.FETCH_REQUEST
}
export interface FetchpostProfilesSuccessActionType {
    type:postProfilesActionTypes.FETCH_SUCCESS,
    payload: {data:IPostProfiles[],lastDoc:string}
}
export interface FetchNextPostProfilesSuccessActionType {
    type:postProfilesActionTypes.FETCH_NEXT_SUCCESS,
    payload: {data:IPostProfiles[],lastDoc:string}
}
export interface FetchpostProfilesFailureActionType {
    type:postProfilesActionTypes.FETCH_FAILURE,
    payload:String,
}
export interface SetLastDocActionType {
    type:postProfilesActionTypes.SET_LASTDOC,
    payload:any
}

type  PostProfileActions =FetchNextPostProfilesSuccessActionType | FetchpostProfilesFailureActionType | FetchpostProfilesRequestActionType | FetchpostProfilesSuccessActionType | SetLastDocActionType;
export default PostProfileActions;
import { ProfileSetup } from "@/types"

export enum userActionTypes {
    FETCH_USER_REQUEST = "FETCH_USER_REQUEST",
    FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
    FETCH_USER_FAILURE = "FETCH_USER_FAILURE",
    DELETE_USER = "DELETE_USER",
    ADD_FRIEND = "ADD_FRIEND",
}

export interface FetchUserRequestActionType {
    type:userActionTypes.FETCH_USER_REQUEST
}
export interface FetchUserSuccessActionType {
    type:userActionTypes.FETCH_USER_SUCCESS,
    payload:ProfileSetup,
}
export interface FetchUserFailureActionType {
    type:userActionTypes.FETCH_USER_FAILURE,
    payload:String,
}
export interface DeleteUserActionType {
    type:userActionTypes.DELETE_USER
}
export interface AddFriendActionType {
    type:userActionTypes.ADD_FRIEND,
    payload:string,
}

type UserAction = FetchUserFailureActionType | FetchUserRequestActionType | FetchUserSuccessActionType | DeleteUserActionType | AddFriendActionType;
export default UserAction;


import { ProfileSetup } from "@/types";
import { UserAction } from "../types";
import { userActionTypes } from "../types";
interface IUser extends ProfileSetup{
    loading:boolean,
    error:string,
}

const intialValue : IUser = {
    loading: false,
    userId : "",
    name: "",
    about: "",
    imgurl: "",
    dob: "",
    following:[],
    gender: "",
    status: "",
    error:"",
}


const UserReducer = (state: IUser = intialValue, action:UserAction) => {
    switch (action.type) {
        case (userActionTypes.FETCH_USER_REQUEST):
            return {...state,loading:true};
        case (userActionTypes.FETCH_USER_SUCCESS):
            return {...state,loading:false,...action.payload};
        case (userActionTypes.FETCH_USER_FAILURE):
            return {...state,loading:false,error:action.payload}
        case (userActionTypes.DELETE_USER):
            return {...intialValue}
        case (userActionTypes.ADD_FRIEND):
            return {...state,following:[...state.following,action.payload]}
        default:
            return state;
    }
}

export default UserReducer;
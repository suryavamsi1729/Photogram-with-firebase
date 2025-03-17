import { combineReducers } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import UserReducer from "./userReducer";
import UserPostReducer from "./userPostsReducer";
const rootReducer = combineReducers({
    user:UserReducer,
    userPosts:UserPostReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export default rootReducer;
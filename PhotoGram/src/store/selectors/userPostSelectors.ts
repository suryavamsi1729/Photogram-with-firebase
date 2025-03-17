import { RootState } from "../reducers";

export const selectPostsState = (state:RootState)=>state.userPosts;

export const selectPostLoading = (state:RootState)=>state.userPosts.loading;

export const selectPostPosts = (state:RootState)=>state.userPosts.posts;

export const selectPostSelectedPosts = (state:RootState)=>state.userPosts.selectedPosts;

export const selectPostError = (state:RootState)=>state.userPosts.errorMassege;



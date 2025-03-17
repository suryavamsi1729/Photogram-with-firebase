import { RootState } from "../reducers";

export const selectPostsState = (state:RootState)=>state.posts;

export const selectPostLoading = (state:RootState)=>state.posts.loading;

export const selectPostPosts = (state:RootState)=>state.posts.posts;

export const selectPostSelectedPosts = (state:RootState)=>state.posts.selectedPosts;

export const selectPostError = (state:RootState)=>state.posts.errorMassege;



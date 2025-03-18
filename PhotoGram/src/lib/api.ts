import { getFistNPosts, getNextNPosts } from "@/repository/post.service";
import { getAllProfiles, getProfile } from "@/repository/profile.service";
import { IPostProfiles, PostResponse, ProfileSetup } from "@/types";
export const  fetchUsers_array = async ():Promise<{ users: ProfileSetup[]; errorMessage: string | null }>=>{
    let users:ProfileSetup[] = []
    let errorMessage:string | null= null
    try {
        const snapshot = await getAllProfiles();
        users = snapshot.docs.map((doc) => doc.data() as ProfileSetup);
    } catch (error: any) {
        errorMessage=error.message ;
    }
    return {users,errorMessage};
}

export const getFriends = (currentUserId:string,following:string[],allUsers:ProfileSetup[])=>{
    return allUsers.filter((user)=>(
        currentUserId!==user.userId && following.includes(user.userId)
    ));
}
export const getSuggestions = (currentUserId:string,following:string[],allUsers:ProfileSetup[])=>{
    return allUsers.filter((user)=>(
        currentUserId!==user.userId && !following.includes(user.userId)
    ));
}

export const getAllPosts_array = async (n:number)=>{
    let posts:PostResponse[] = []
    let errorMessage:string | null= null
    let lastDoc:any;
    try {
        const snapshot = await getFistNPosts(n);
        lastDoc= snapshot.docs[snapshot.docs.length - 1].id
        posts = snapshot.docs.map((doc) => {
            const data = doc.data() as PostResponse;
            return {...data,id:doc.id};
        });
    } catch (error: any) {
        errorMessage=error.message ;
    }
    return {posts,errorMessage,lastDoc};
}
export const getNextPosts_Array = async (n:number,date:string,lastid:string)=>{
  let posts:PostResponse[] = []
  let errorMessage:string | null= null
  let lastDoc:any;
  try {
      const snapshot = await getNextNPosts(n,date,lastid);
      lastDoc= snapshot.docs[snapshot.docs.length - 1].id
      posts = snapshot.docs.map((doc) => {
          const data = doc.data() as PostResponse;
          return {...data,id:doc.id};
      });
  } catch (error: any) {
      errorMessage=error.message ;
  }
  return {posts,errorMessage,lastDoc};
}
export const getAllPostWithProfiles = async (n:number):Promise<{post:IPostProfiles[],lastDoc:string}> => {
  // Get posts and any potential error message
  const { posts, errorMessage,lastDoc } = await getAllPosts_array(n);
  
  if (errorMessage) {
    throw new Error(errorMessage);
  }
  
  // For each post, fetch the associated profile (if userId exists) in parallel.
  const postsWithProfiles = await Promise.all(
    posts.map(async (post) => {
      let profile = null;
      if (post.userId) {
        try {
          // Assuming getProfile returns an object with fields: imageUrl, adout, name
          profile = (await getProfile(post.userId)).data() as ProfileSetup;
        } catch (err) {
          console.error(`Error fetching profile for userId ${post.userId}:`, err);
        }
      }
      // Combine post data with the profile fields (if available)
      return { ...post, profile: profile ? { imgurl: profile.imgurl, adout: profile.about, name: profile.name } : null };
    })
  );
  
  return {post:postsWithProfiles,lastDoc:lastDoc};
};
export const getNextPostWithProfiles = async (n:number,date:string,lastid:string):Promise<{post:IPostProfiles[],lastDoc:string}> => {
  // Get posts and any potential error message
  const { posts, errorMessage,lastDoc } = await getNextPosts_Array(n,date,lastid);
  
  if (errorMessage) {
    throw new Error(errorMessage);
  }
  
  // For each post, fetch the associated profile (if userId exists) in parallel.
  const postsWithProfiles = await Promise.all(
    posts.map(async (post) => {
      let profile = null;
      if (post.userId) {
        try {
          // Assuming getProfile returns an object with fields: imageUrl, adout, name
          profile = (await getProfile(post.userId)).data() as ProfileSetup;
        } catch (err) {
          console.error(`Error fetching profile for userId ${post.userId}:`, err);
        }
      }
      // Combine post data with the profile fields (if available)
      return { ...post, profile: profile ? { imgurl: profile.imgurl, adout: profile.about, name: profile.name } : null };
    })
  );
  
  return {post:postsWithProfiles,lastDoc:lastDoc};
};

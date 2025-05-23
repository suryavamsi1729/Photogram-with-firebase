import { OutputFileEntry } from "@uploadcare/react-uploader";

export interface UserSignIn{
    email:string,
    password:string,
    errorPassword:string,
    confimePassword:string,
}
export interface ProfileSetup{
    userId:string,
    name:string,
    about:string,
    imgurl: string,
    dob:string,
    following:string[],
    gender:string,
    status:string,

}

export interface UserLogIn{
    email:string,
    password:string,
}

export interface ForgotPassword{
    email: string,
    setError: string,
    sucessmsg: string,
}

export interface IResetPassword {
    newpassword: string,
    cnfpassword: string,
    error: string,
}
export interface IBasicFCProps{
    children?:React.ReactNode,
    className?: string,
}

export interface Post{
    caption:string,
    likes:number,
    photos: PhotoMeta[],
    userLikes: [],
    userId: string|null,
    date:string, 
}

export interface PhotoMeta{
    cdnUrl: string | null,
    uuid:string | null,
}

export interface FileEntry{
    files: OutputFileEntry[],
}

export interface PostResponse{
    id:string,
    caption:string,
    likes:number,
    photos: PhotoMeta[],
    userLikes: [],
    userId: string|null,
    date:string,
}

export interface OutletPost{
    postData:PostResponse[],
    setPostData: (postData:PostResponse[])=>void,
    selectedPosts:PostResponse[],
    setSelectedPosts:(selectedPosts:PostResponse[])=>void,
    loading:boolean
}
export interface User{
    userId:string,
    emailverified:boolean,
    email:string | null,
    password:string ,
}
export interface Follower{
    id:string,
    name: string,
    imgUrl : string,
    status: string
}
export interface Profile {
    imgurl: string;
    adout: string; // Assuming "adout" is intentional; otherwise, use "about".
    name: string;
  }
  
export interface IPostProfiles extends PostResponse{
    profile: Profile | null;
}
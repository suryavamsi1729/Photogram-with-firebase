import { OutputFileEntry } from "@uploadcare/react-uploader";

export interface UserSignIn{
    email:string,
    password:string,
    errorPassword:string,
    confimePassword:string,
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
    userId: String|null,
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
    userId: String|null,
    date:string,
}
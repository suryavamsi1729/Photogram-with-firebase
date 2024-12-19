
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

export default interface PasswordResetEmail{
    email: string,
    setError: string,
}
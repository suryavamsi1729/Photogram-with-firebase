
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
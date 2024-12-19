//imporing components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { UserLogIn } from "@/types";
import { useUseAuth } from "@/context/userAuthContex";
import { Icons } from "@/components/ui/icons";
import AuthLayout from "@/components/ui/authLayout";

//importing css files
import "./index.css";


//interface to define the props types
interface ILogInProps {
}

//for the login a user  email and password is 
//taken from the user the with intial values email and password  are empty string 
const initalValue : UserLogIn = {
    email:"",
    password: "",
}

const Login:React.FunctionComponent <ILogInProps> = () => {
    const navigate = useNavigate();
    const {logIn,googleSignIn,logOut,setLoading} = useUseAuth();
    const [userInfo,setUserInfo] = useState<UserLogIn>(initalValue);
    const handelSubmit = async (e:React.MouseEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const user = await logIn(userInfo.email,userInfo.password);
            if(user.user.emailVerified){
                alert("login is sucessfull");
                navigate("/");
            }
            else{
                alert("verify email befor login");
                await logOut();
            }
            
        }
        catch(error){
            console.log("error is :",error);
        }
        setLoading(false);
    }
    const handelGopgleSignin = async (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setLoading(true);
        try{
            await googleSignIn();
            navigate("/");
        }
        catch(error){
            console.log("Error is type is",error);
        }
        setLoading(false);
    }
    return (
        <AuthLayout>
            <Card className="border-zinc-500/30 bg-transparent">
                <form onSubmit={handelSubmit}>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-slate-50">Login to account</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Enter your email below to Login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-2 gap-6">
                            <Button className="bg-transparent text-slate-50 hover:text-slate-50 hover:bg-zinc-500/30 border-zinc-500/30 hover:border-0" variant="outline">
                                <Icons.gitHub className="mr-2 h-4 w-4" />
                                Github
                            </Button>
                            <Button className="bg-transparent text-slate-50 hover:text-slate-50 hover:bg-zinc-500/30 border-zinc-500/30 hover:border-0" variant="outline" onClick={handelGopgleSignin}>
                                <Icons.google className="mr-2 h-4 w-4" />
                                Google
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-zinc-500/40" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-zinc-950 px-2 text-zinc-400">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="grid gap-2">
                                <Label className="text-slate-50" htmlFor="email">Email</Label>
                                <Input 
                                    className="focus-visible:ring-transparent focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0  text-slate-50/60 focus:text-slate-50 bg-zinc-900/40 border-[1px] focus:bg-zinc-950 border-zinc-500/30 focus:border-slate-50"
                                    id="email" 
                                    type="email" 
                                    placeholder="m@example.com" 
                                    value={userInfo.email}
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                                        setUserInfo({...userInfo,email:e.target.value})
                                    }}
                                    />
                                
                                </div>
                                <div className="grid gap-2">
                                <Label className="text-slate-50" htmlFor="password">Password</Label>
                                <Input 
                                className="focus-visible:ring-transparent focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0  text-slate-50/60 focus:text-slate-50 bg-zinc-900/40 border-[1px] focus:bg-zinc-950 border-zinc-500/30 focus:border-slate-50"
                                id="password" 
                                type="password"
                                value={userInfo.password}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                                    setUserInfo({...userInfo,password:e.target.value})
                                }}
                                />
                                </div>
                                <div className="grid">
                                    <span onClick={()=>{navigate("/passwordreset")}} className="justify-self-end hover:cursor-pointer hover:text-indigo-600 text-xs text-indigo-500 font-semibold">Forgot Password?</span>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col">
                                <Button className="w-full bg-slate-50 hover:bg-slate-50/90 border-0 text-zinc-950" type="submit">Login</Button>
                                <p className="mt-3 text-sm  text-center text-slate-100/90">
                                    Don't have an Account ? <Link to="/signup">signup</Link>
                                </p>
                            </CardFooter>
                </form>
            </Card>
        </AuthLayout>
    );
}

export default Login;
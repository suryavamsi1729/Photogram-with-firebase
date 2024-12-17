// import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { UserLogIn } from "@/types";
import { useUseAuth } from "@/context/userAuthContex";
import { Icons } from "@/components/ui/icons";

import "./index.css";

interface ILogInProps {

}

const initalValue : UserLogIn = {
    email:"",
    password: "",
}

const Login:React.FunctionComponent <ILogInProps> = () => {
    const navigate = useNavigate();
    const {logIn,googleSignIn} = useUseAuth();
    
    const [userInfo,setUserInfo] = useState<UserLogIn>(initalValue);
    const handelSubmit = async (e:React.MouseEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            await logIn(userInfo.email,userInfo.password);
            navigate("/");
        }
        catch(error){
            console.log("error is :",error);
        }
    }
    const handelGopgleSignin = async (e:React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        try{
            await googleSignIn();
            navigate("/");
        }
        catch(error){
            console.log("Error is type is",error);
        }
    }
    return (
        <div className="w-screen h-screen flex flex-row justify-center items-center bg-zinc-950 px-5">
            <div className="hidden md:block w-1/2 h-5/6 ">
                <div className="relative group w-full h-full grid grid-cols-2 hover:gap-16 gap-5 transition-all duration-700 delay-75">
                    <div className="image-ele-fist w-2/3 aspect-video  place-self-end rounded-xl z-50 bg-[url('assets/image-3.jpeg')] bg-cover bg-center"></div>
                    <div className="image-ele-sec w-[40%] aspect-[9/14] bg-gray-300  self-end rounded-xl z-50 bg-[url('assets/image-1.jpeg')] bg-cover bg-center"></div>
                    <div className="image-ele-third w-[40%] aspect-[9/14] bg-gray-300 justify-self-end rounded-xl z-50 bg-[url('assets/image-2.jpeg')] bg-cover bg-center"></div>
                    <div className="image-ele-fourth w-2/3 aspect-video bg-gray-300 rounded-xl z-50 bg-[url('assets/image-4.jpeg')] bg-cover bg-center"></div>
                    <div className="absolute inset-0 z-40 flex justify-center items-center">
                        <p className="bg-clip-text opacity-0 group-hover:opacity-100 bg-gradient-to-r  from-purple-500 to-pink-500 text-center text-3xl text-transparent font-bold transition-all duration-700 delay-100">PhotoGram</p>
                    </div>
                </div>
            </div>
            <div className="relative w-full md:w-1/2 h-full flex flex-col justify-center items-center">
            <div className="circulargraidents absolute w-40 h-40 top-16 left-16 rounded-full bg-slate-50 z-10"></div>
            <div className="absolute inset-0 z-40"></div>
            <div className="max-w-sm rounded-xl bg-zinc-950  text-card-foreground z-50">
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
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className="w-full bg-slate-50 hover:bg-slate-50/90 border-0 text-zinc-950" type="submit">Login</Button>
                        <p className="mt-3 text-sm  text-center text-slate-100/90">
                            Don't have an Account ? <Link to="/signup">signup</Link>
                        </p>
                    </CardFooter>
                    </form>
                </Card>
            </div>
            </div>
        </div>
    );
}

export default Login;
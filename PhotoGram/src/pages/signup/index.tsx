// import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { UserSignIn } from "@/types";
import { useUseAuth } from "@/context/userAuthContex";
import { Icons } from "@/components/ui/icons";
interface ISignUpProps {

}

const initalValue : UserSignIn = {
    email:"",
    password: "",
    confimePassword:"",
}

const Signup:React.FunctionComponent <ISignUpProps> = () => {
    const navigate = useNavigate();
    const {signUp,googleSignIn} = useUseAuth();
    const [userInfo,setUserInfo] = useState<UserSignIn>(initalValue);
    const handelSubmit = async (e:React.MouseEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            await signUp(userInfo.email,userInfo.password);
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
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="max-w-sm rounded-xl border bg-card text-card-foreground">
                <Card>
                    <form onSubmit={handelSubmit}>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>
                        Enter your email below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-2 gap-6">
                        <Button variant="outline">
                            <Icons.gitHub className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                        <Button variant="outline" onClick={handelGopgleSignin}>
                            <Icons.google className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                        </div>
                        <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                            </span>
                        </div>
                        </div>
                        <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
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
                        <Label htmlFor="password">Password</Label>
                        <Input 
                        id="password" 
                        type="password"
                        value={userInfo.password}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                            setUserInfo({...userInfo,password:e.target.value})
                        }}
                        />
                        </div>
                        <div className="grid gap-2">
                        <Label htmlFor="confimpassword">Confim Password</Label>
                        <Input 
                        id="confimpassword" 
                        type="password"
                        value={userInfo.confimePassword}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                            setUserInfo({...userInfo,confimePassword:e.target.value})
                        }}
                        />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className="w-full" type="submit">Create account</Button>
                        <p className="mt-3 text-sm text-center">
                            Alredy have an Account ? <Link to="/login">login</Link>
                        </p>
                    </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default Signup;
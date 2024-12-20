import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { UserSignIn } from "@/types";
import { useUseAuth } from "@/context/userAuthContex";
import { Icons } from "@/components/ui/icons";
import Spinner from "@/components/ui/sipinner";
import { auth } from "@/firebaseConfig";
import { validatePassword ,sendEmailVerification} from "firebase/auth";
import AuthLayout from "@/components/ui/authLayout";
import { useToast } from "@/hooks/use-toast";

interface ISignUpProps {
}
const initalValue : UserSignIn = {
    email:"",
    password: "",
    errorPassword:"",
    confimePassword:"",
}
const Signup:React.FunctionComponent <ISignUpProps> = () => {
    const {toast} = useToast();
    const navigate = useNavigate();
    const {signUp,googleSignIn,setLoading,loading} = useUseAuth();
    const [userInfo,setUserInfo] = useState<UserSignIn>(initalValue);
    const handelSubmit = async (e:React.MouseEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true);
        try{
            const status = await validatePassword(auth,userInfo.confimePassword);
            if(status.isValid){
                console.log("surya");
                var user = await signUp(userInfo.email,userInfo.confimePassword);
                await sendEmailVerification(user.user,{
                    url: "http://localhost:3000/email-verification",
                    handleCodeInApp:true,
                });
                alert(`verifcation email is send to ${user.user.email}`);
                navigate("/login");
            }
            else{
                let errorMessage = "need ";
                if(!status.containsLowercaseLetter){
                    errorMessage = `${errorMessage} Lowercase`;
                }
                if(!status.containsUppercaseLetter){
                    errorMessage = `${errorMessage} Uppercase`;
                }
                if(!status.containsNumericCharacter){
                    errorMessage = `${errorMessage} Numerical`;
                }
                if(!status.containsNonAlphanumericCharacter){
                    errorMessage = `${errorMessage} Specila`;
                }
                if(!status.meetsMinPasswordLength){
                    errorMessage = `${errorMessage} Min 6 `;
                }

                setUserInfo({...userInfo,errorPassword:`${errorMessage} chars`});
            }
        }
        catch(error:any){
            switch (error.code) {
                case "auth/email-already-in-use":
                    toast({
                        variant: "destructive",
                        title: error.code,
                        description: "The email address is already in use by another account.",
                      });
                    break;
                case "auth/invalid-email":
                    toast({
                        variant: "destructive",
                        title: error.code,
                        description: "Please enter a valid email address.",
                    });
                    break;
                case "auth/operation-not-allowed":
                    toast({
                        variant: "destructive",
                        title: error.code,
                        description: "Email/password accounts are not enabled. Contact support.",
                    });
                    break;
                case "auth/weak-password":
                    toast({
                        variant: "destructive",
                        title: error.code,
                        description: "Your password is too weak. Please use at least 6 characters.",
                    });
                    break;
                default:
                    toast({
                        variant: "destructive",
                        title: "Unkown Error",
                        description: "An unknown error occurred. Please try again.",
                    });
                    break;
            }
        }
        
        setLoading(false);
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
        <AuthLayout>
            <Card className="border-zinc-500/30 bg-transparent">
                            <form onSubmit={handelSubmit}>
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl text-slate-50">Create an account</CardTitle>
                                <CardDescription className="text-zinc-400">
                                Enter your email below to create your account
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
                                <Label className="text-slate-50"  htmlFor="email">Email</Label>
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
                                <Label className="text-slate-50"  htmlFor="password">Password</Label>
                                <Input
                                className="focus-visible:ring-transparent focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0  text-slate-50/60 focus:text-slate-50 bg-zinc-900/40 border-[1px] focus:bg-zinc-950 border-zinc-500/30 focus:border-slate-50" 
                                id="password" 
                                type="password"
                                value={userInfo.password}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                                    setUserInfo({...userInfo,password:e.target.value})
                                }}
                                />
                                <span className={`${userInfo.errorPassword === ""?"invisible":"visible"} text-xs text-red-600 font-normal`}>{userInfo.errorPassword}</span>
                                </div>
                                <div className="grid gap-2">
                                <Label className="text-slate-50"  htmlFor="confimpassword">Confim Password</Label>
                                <Input 
                                className="focus-visible:ring-transparent focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0  text-slate-50/60 focus:text-slate-50 bg-zinc-900/40 border-[1px] focus:bg-zinc-950 border-zinc-500/30 focus:border-slate-50"
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
                                <div className="relative w-full">
                                    <Button className="w-full bg-slate-50 hover:bg-slate-50/90 border-0 text-zinc-950" type="submit">
                                    {
                                        loading?null:"Create Account"
                                    }
                                    </Button>
                                    {
                                        loading
                                        ?<div className="absolute inset-0 flex justify-center items-center gap-2 ">
                                            <div className="w-8 h-8">
                                                <Spinner/>
                                            </div>
                                            <p className="text-base text-indigo-600 font-medium">Loading...</p>
                                        </div>
                                        :null
                                    }

                                </div>
                                <p className="mt-3 text-sm  text-center text-slate-100/90">
                                    Alredy have an Account ? <Link to="/login">login</Link>
                                </p>
                            </CardFooter>
                            </form>
            </Card>
        </AuthLayout>
    );
}

export default Signup;
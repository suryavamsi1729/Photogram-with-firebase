import { Card,CardContent,CardFooter,CardHeader,CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/sipinner";
import { useLocation,useNavigate } from "react-router-dom";
import { useUseAuth } from "@/context/userAuthContex";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
interface IVerifyEmail{

}

const VerifyEmail:React.FC<IVerifyEmail> = ()=>{
    const {toast} = useToast();
    const navigate = useNavigate();
    const [emailVerified,setEVerified] = useState<boolean>(false);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const oobCode = params.get("oobCode");
    const {verifyEmail,loading,setLoading} = useUseAuth();
    const verifyEmailFun = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setEVerified(false);
        setLoading(true);
      
        if (oobCode) {
          try {
            await verifyEmail(oobCode);
            setEVerified(true);
            toast({
              title: "Email verified successfully!",
              description: "Your email address has been verified. You can now log in.",
            });
          } catch (error: any) {
            // Handling specific Firebase errors
            switch (error.code) {
              case "auth/expired-action-code":
                toast({
                  variant: "destructive",
                  title: "Verification link expired.",
                  description: "The verification link has expired. Please request a new one.",
                });
                break;
      
              case "auth/invalid-action-code":
                toast({
                  variant: "destructive",
                  title: "Invalid verification link.",
                  description: "The verification link is invalid or has already been used.",
                });
                break;
      
              case "auth/user-disabled":
                toast({
                  variant: "destructive",
                  title: "User account disabled.",
                  description: "Your account has been disabled. Please contact support for assistance.",
                });
                break;
      
              case "auth/user-not-found":
                toast({
                  variant: "destructive",
                  title: "User not found.",
                  description: "No user found for this verification link. Please ensure the link is correct.",
                });
                break;
      
              case "auth/network-request-failed":
                toast({
                  variant: "destructive",
                  title: "Network error.",
                  description: "A network error occurred. Please check your connection and try again.",
                });
                break;
      
              default:
                toast({
                  variant: "destructive",
                  title: "An unknown error occurred.",
                  description: "Something went wrong during email verification. Please try again later.",
                });
            }
      
            // Log the error for debugging purposes
            console.log(error);
          }
        } else {
          toast({
            variant: "destructive",
            title: "Verification code missing.",
            description: "The verification code (oobCode) is missing. Please check the verification link.",
          });
        }
      
        setLoading(false);
    };
      
    return(
        <>
            <Card className="border-zinc-500/30 bg-transparent py-2 ">
                    <div className="w-96 grid gap-3">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-slate-50">Email Verification</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {emailVerified
                                ?<div className="flex justify-center items-center gap-4 py-3">
                                    <div className="relative w-10 h-10 flex justify-center items-center">
                                        <div className="absolute w-[85%] h-[85%] animate-ping bg-green-300 rounded-full">
                                        </div>
                                        <div className="relative w-10 h-10 p-2 rounded-full bg-green-500 flex justify-center items-center">
                                            <svg className="fill-green-100  stroke-[5px] scaleinout" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-lg text-green-400 font-semibold">Email Verified</p>
                                </div>
                                :<p className="text-sm text-slate-50 font-normal">click on the Button below to verify your Email </p>
                            }
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            {
                                emailVerified
                                ?<Button className="w-full bg-green-500/90 hover:bg-green-500/85 border-0 text-base font-medium text-slate-50" onClick={()=>{navigate("/login")}}>Continue</Button>
                                :
                                <button onClick={verifyEmailFun} className="w-full h-10 px-4 py-2 bg-slate-50 rounded-md hover:bg-slate-50/90 border-0 text-zinc-950 font-medium flex justify-center items-center gap-2" type="submit">
                                {
                                    loading?
                                    <>
                                        <div className="w-8 h-8">
                                            <Spinner/>
                                        </div>
                                        <p className="text-base font-medium text-indigo-600">Loading...</p>
                                    </>
                                    :"Verify Email"
                                }
                                </button>
                            }
                        </CardFooter>
                    </div>
                </Card>
        </>
    );
}

export default VerifyEmail;
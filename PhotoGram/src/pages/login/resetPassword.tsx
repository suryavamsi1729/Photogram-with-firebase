
import Spinner from "@/components/ui/sipinner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useUseAuth } from "@/context/userAuthContex";
import { IResetPassword } from "@/types";
import { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface IPasswordReset{

}

const ForgotPasswordval : IResetPassword={
    newpassword: "",
    cnfpassword: "",
    error: "",
} 

const ResetPassword : React.FC<IPasswordReset> = ()=>{
    const {toast} = useToast();
    const location = useLocation();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(location.search);
    const oobCode = urlParams.get("oobCode");
    const {resetPassword,loading,setLoading} = useUseAuth();
    const [passwordDetails,setPassswordDetails] = useState<IResetPassword>(ForgotPasswordval);
    const sendEmail = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
      
        if (oobCode) {
          try {
            await resetPassword(oobCode, passwordDetails.cnfpassword);
            navigate("/login");
          } catch (error: any) {
            // Handling specific Firebase errors
            switch (error.code) {
              case "auth/expired-action-code":
                toast({
                  variant: "destructive",
                  title: "Reset link expired.",
                  description: "The reset link has expired. Please request a new one.",
                });
                break;
      
              case "auth/invalid-action-code":
                toast({
                  variant: "destructive",
                  title: "Invalid reset link.",
                  description:
                    "The reset link is invalid or has already been used. Please request a new one.",
                });
                break;
      
              case "auth/user-not-found":
                toast({
                  variant: "destructive",
                  title: "User not found.",
                  description: "No user found for the provided credentials.",
                });
                break;
      
              case "auth/weak-password":
                toast({
                  variant: "destructive",
                  title: "Weak password.",
                  description: "Your password is too weak. Use at least 6 characters.",
                });
                break;
      
              case "auth/operation-not-allowed":
                toast({
                  variant: "destructive",
                  title: "Operation not allowed.",
                  description:
                    "Password reset is currently disabled. Please contact support.",
                });
                break;
      
              case "auth/network-request-failed":
                toast({
                  variant: "destructive",
                  title: "Network error.",
                  description: "Please check your internet connection and try again.",
                });
                break;
      
              default:
                toast({
                  variant: "destructive",
                  title: "Uh oh! Something went wrong.",
                  description:
                    "An unexpected error occurred. Please try again later or contact support.",
                });
            }
      
            // Log error for debugging purposes
            console.log(error);
          }
        }
      
        setLoading(false);
      };
      
    return(
        <>
                <Card className="border-zinc-500/30 bg-transparent py-2">
                    <form onSubmit={sendEmail}>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-slate-50">Password Reset</CardTitle>
                            <CardDescription className="text-zinc-400 py-3">
                                Enter your pssword below  to update Password 
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2 py-1">
                                <Label className="text-slate-50" htmlFor="newpassword">New Password</Label>
                                <Input 
                                className="focus-visible:ring-transparent focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0  text-slate-50/60 focus:text-slate-50 bg-zinc-900/40 border-[1px] focus:bg-zinc-950 border-zinc-500/30 focus:border-slate-50"
                                id="newpassword" 
                                type="password" 
                                placeholder="New Password"
                                value={passwordDetails.newpassword}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                                    setPassswordDetails({...passwordDetails,newpassword:e.target.value});
                                }}
                                />
                            </div>
                            <div className="grid gap-2 py-1">
                                <Label className="text-slate-50" htmlFor="cnfpwd">Confime Password</Label>
                                <Input 
                                className="focus-visible:ring-transparent focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0  text-slate-50/60 focus:text-slate-50 bg-zinc-900/40 border-[1px] focus:bg-zinc-950 border-zinc-500/30 focus:border-slate-50"
                                id="cnfpwd" 
                                type="password" 
                                placeholder="Confime Password"
                                value={passwordDetails.cnfpassword}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                                    setPassswordDetails({...passwordDetails,cnfpassword:e.target.value});
                                }}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                            <button className="w-full h-10 px-4 py-2 bg-slate-50 rounded-md hover:bg-slate-50/90 border-0 text-zinc-950 font-medium flex justify-center items-center gap-2" type="submit">
                                {
                                    loading?
                                    <>
                                        <div className="w-8 h-8">
                                            <Spinner/>
                                        </div>
                                        <p className="text-base font-medium text-indigo-600">Loading...</p>
                                    </>
                                    :"Update Password"
                                }
                            </button>
                        </CardFooter>
                    </form>
                </Card>
             
        </>
    );
}

export default ResetPassword; 
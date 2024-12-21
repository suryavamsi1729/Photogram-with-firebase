import AuthLayout from "@/components/ui/authLayout";
import Spinner from "@/components/ui/sipinner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useUseAuth } from "@/context/userAuthContex";
import { ForgotPassword } from "@/types";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
interface IPasswordReset{

}

const PasswordResetEmailval : ForgotPassword ={
    email: "",
    setError: "",
    sucessmsg: "",
} 

const forgotPassword : React.FC<IPasswordReset> = ()=>{
  const {toast} = useToast();
    const {linkToResetPassword,loading,setLoading} = useUseAuth();
    const [emailDetails,setEmailDetails] = useState<ForgotPassword>(PasswordResetEmailval);
    const sendEmail = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        console.log(emailDetails.email);
        try {
          await linkToResetPassword(emailDetails.email);
          toast({
            className:"bg-green-500 text-slate-50 border-none",
            title: "Link Send Successfully.",
            description: "if the user exist with email, then Password Reset link is send to the email.",
          });
        } catch (error: any) {
          switch (error.code) {
            case "auth/invalid-email":
              setEmailDetails({
                ...emailDetails,
                setError: "The email address is invalid. Please enter a valid email.",
              });
              break;
            case "auth/user-not-found":
              setEmailDetails({
                ...emailDetails,
                setError: "No account found with this email address.",
              });
              break;
            case "auth/network-request-failed":
              setEmailDetails({
                ...emailDetails,
                setError: "Network error. Please check your connection and try again.",
              });
              break;
            case "auth/too-many-requests":
              setEmailDetails({
                ...emailDetails,
                setError:
                  "Too many requests. Please wait a while before trying again.",
              });
              break;
            default:
              setEmailDetails({
                ...emailDetails,
                setError: "An unknown error occurred. Please try again later.",
              });
          }
        }
        setLoading(false);
      };
      
    return(
        <>
            <AuthLayout>
                <Card className="border-zinc-500/30 bg-transparent py-2">
                    <form onSubmit={sendEmail}>
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-slate-50">Password Reset</CardTitle>
                            <CardDescription className="text-zinc-400 py-3">
                                Enter your email below  to send Password Rest mail
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2 py-3">
                                <Label className="text-slate-50" htmlFor="email">Email</Label>
                                <Input 
                                className="focus-visible:ring-transparent focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0  text-slate-50/60 focus:text-slate-50 bg-zinc-900/40 border-[1px] focus:bg-zinc-950 border-zinc-500/30 focus:border-slate-50"
                                id="email" 
                                type="email" 
                                placeholder="m@example.com"
                                value={emailDetails.email}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                                    setEmailDetails({...emailDetails,email:e.target.value});
                                }}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col">
                        <button  className="w-full h-10 px-4 py-2 bg-slate-50 rounded-md hover:bg-slate-50/90 border-0 text-zinc-950 font-medium flex justify-center items-center gap-2" type="submit">
                                {
                                    loading?
                                    <>
                                        <div className="w-8 h-8">
                                            <Spinner/>
                                        </div>
                                        <p className="text-base font-medium text-indigo-600">Loading...</p>
                                    </>
                                    :"Send Link"
                                }
                                </button>
                        </CardFooter>
                    </form>
                </Card>
            </AuthLayout>     
        </>
    );
}

export default forgotPassword; 
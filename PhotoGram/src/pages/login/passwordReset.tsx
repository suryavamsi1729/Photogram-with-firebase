import AuthLayout from "@/components/ui/authLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useUseAuth } from "@/context/userAuthContex";
import PasswordResetEmail from "@/types";
import { useState } from "react";

interface IPasswordReset{

}

const PasswordResetEmailval : PasswordResetEmail ={
    email: "",
    setError: "",
} 

const PasswordReset : React.FC<IPasswordReset> = ()=>{
    const {linkToResetPassword} = useUseAuth();
    const [emailDetails,setEmailDetails] = useState<PasswordResetEmail>(PasswordResetEmailval);
    const sendEmail = async (e:React.MouseEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try{
            await linkToResetPassword(emailDetails.email);
            alert("email sent");
        }
        catch(error){
            setEmailDetails({...PasswordResetEmailval,setError:"email not exist"});
        }
    }
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
                            <Button className="w-full bg-slate-50 hover:bg-slate-50/90 border-0 text-zinc-950" type="submit">Send Link</Button>
                        </CardFooter>
                    </form>
                </Card>
            </AuthLayout>     
        </>
    );
}

export default PasswordReset; 
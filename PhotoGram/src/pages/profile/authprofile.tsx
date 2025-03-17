import { FileEntry, IBasicFCProps, ProfileSetup} from "@/types";
import AuthLayout from "@/components/ui/authLayout";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import image from "@/assets/images/image-4.jpeg";
import {Camera} from "lucide-react";
import  { ProfileUploder } from "@/components/fileuploder";
import { useUseAuth } from "@/context/userAuthContex";
import { createProfile } from "@/repository/profile.service";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";


interface IAuthProfile extends IBasicFCProps{

}
const initalValue : ProfileSetup = {
    userId:"",
    name:"",
    about:"",
    imgurl: "",
    dob:"",
    following:[],
    gender:"",
    status:""

}
const AuthProfile:React.FC <IAuthProfile> = ()=>{ 
    const {toast} = useToast();
    const [profileInfo,setProfileInfo] = useState<ProfileSetup>(initalValue);
    const [isOpen,setOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const [uid] = useLocalStorage<string>("uid", "");
    const {setLoading} = useUseAuth();
     const [fileEntry,setFileEntry] =useState<FileEntry>({
            files:[],
        });
        useEffect(()=>{
            setProfileInfo({...profileInfo,imgurl:fileEntry.files[0]?.cdnUrl||""});
            
        },[fileEntry]);
        useEffect(()=>{
            setProfileInfo({...profileInfo,userId:uid});
        },[]);
    const handesubmit = async (e:React.MouseEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setLoading(true);
        try {
            createProfile(profileInfo);
            navigate("/");
            toast({
                variant: "default",
                title: "Success",
                description: "Navigating to home"
              });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Error Occured"
              });
        }
        setLoading(false)
    }
    return(
        <AuthLayout className="max-w-full">
            <div className="w-[470px] h-auto flex flex-col justify-start items-center px-8 py-5">
                <h1 className="w-auto h-auto text-white font-medium text-3xl">Profile</h1>
                <div className="w-full h-auto flex flex-col justify-center items-start py-6">
                    <form onSubmit={handesubmit} className="w-full h-auto flex flex-col justify-center items-center gap-4 px-2">
                        <div className="relative w-auto grid gap-2 justify-center items-center mb-1">
                            <img src={fileEntry.files[0]?.cdnUrl || image} className="w-[88px] h-[88px] rounded-full object-cover" alt={"profileimage"} />
                            <div onClick={()=>{setOpen(!isOpen)}} className="z-40 absolute hover:cursor-pointer right-[2px] bottom-[2px] w-6 h-6 flex flex-col justify-center items-center bg-slate-100 rounded-full">
                                <Camera className="w-4 h-4 stroke-2 "/>
                            </div>
                            <ProfileUploder className="z-50 w-6 h-6 absolute right-[2px] bottom-[2px] hover:cursor-pointer" fileEntry={fileEntry} onChange={setFileEntry} isOpen={isOpen} setOpen={setOpen} />
                        </div>
                        <div className="w-full grid  gap-1">
                            <Label className="text-slate-50 text-base"  htmlFor="name">Name</Label>
                            <Input 
                                    className="focus-visible:ring-transparent focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0  text-slate-50/60 focus:text-slate-50 bg-zinc-900/40 border-[1px] focus:bg-zinc-950 border-zinc-500/30 focus:border-slate-50"
                                    id="name" 
                                    type="text" 
                                    placeholder="Enter your name"
                                    value={profileInfo.name}
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                                        setProfileInfo({...profileInfo,name:e.target.value})
                            }}
                            />
                        </div>
                        <div className="w-full grid gap-1">
                            <Label className="text-slate-50 text-base"  htmlFor="about">About</Label>
                            <Input 
                                    className="focus-visible:ring-transparent focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0  text-slate-50/60 focus:text-slate-50 bg-zinc-900/40 border-[1px] focus:bg-zinc-950 border-zinc-500/30 focus:border-slate-50"
                                    id="about" 
                                    type="text" 
                                    placeholder="about"
                                    value={profileInfo.about}
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                                        setProfileInfo({...profileInfo,about:e.target.value})
                            }}
                            />
                        </div>
                        <div className="w-full grid gap-1">
                            <Label className="text-slate-50 text-base"  htmlFor="birthday">Birthday</Label>
                            <Input 
                                    className="focus-visible:ring-transparent focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0  text-slate-50/60 focus:text-slate-50 bg-zinc-900/40 border-[1px] focus:bg-zinc-950 border-zinc-500/30 focus:border-slate-50"
                                    id="birthday" 
                                    type="text" 
                                    placeholder="dd/mm/yyyy"
                                    value={profileInfo.dob}
                                    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                                        setProfileInfo({...profileInfo,dob:e.target.value});
                            }}
                            />
                        </div>
                        <button type="submit" className="w-full h-auto px-6 py-1 rounded-md bg-slate-50 text-zinc-900 font-semibold text-lg mt-6">
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}

export default AuthProfile;
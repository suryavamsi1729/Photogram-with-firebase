import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation,useNavigate } from "react-router-dom";
import {Label}  from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Spinner from "@/components/ui/sipinner";

interface ICreatePost{

}

const CreatePost:React.FC <ICreatePost> = ()=>{
    const [loading,setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state.from.pathname);
    return (
        <>
            <div className="w-full h-full flex flex-col justify-start items-center px-8 py-4 gap-4">
                <div className="w-full h-auto p-1 flex flex-row justify-start items-center">
                    <div onClick={()=>{navigate(location.state.from.pathname)}} className="w-9 h-9 p-1 flex flex-col justify-center items-center bg-pink-200 rounded-full hover:cursor-pointer">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path className="fill-pink-800" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                        </svg>
                    </div>
                </div>
                <div className="w-full grow flex flex-col justify-start items-center">
                    <Card className="h-auto px-2 border-zinc-500/30 bg-transparent">
                        <form className="w-full h-auto flex flex-col justify-start items-center gap-4" onSubmit={(e)=>{e.preventDefault()}}>
                            <CardHeader className="p-4 py-6 space-y-2">
                                <CardTitle className="text-2xl text-slate-50">Frame It & Share It</CardTitle>
                                <CardDescription className="text-zinc-300/60 font-normal">
                                    Capture your moments, frame them with creativity, and share your unique perspective with the world. Let your photos tell your story!
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="w-full h-auto grid gap-8">
                                <div className="flex flex-col gap-2">
                                    <Label  className="text-slate-50" htmlFor="caption"> Caption</Label>
                                    <Textarea className="px-4 py-3 focus-visible:ring-transparent focus-visible:outline-none focus-visible:ring-0  focus-visible:ring-offset-0  text-slate-50/60 focus:text-slate-50 bg-zinc-900/40 border-[1px] focus:bg-zinc-950 border-zinc-500/30 focus:border-slate-50"  id="caption" placeholder="What's the story behind this shot? Add a caption to share your thoughts!"/>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label  className="text-slate-50" htmlFor="photos"> Photos</Label>
                                    <div className="w-full h-32 hidden"></div>
                                </div>
                            </CardContent>
                            <CardFooter className="w-full h-auto flex flex-col">
                                <button className="w-full h-10 px-4 py-2 bg-slate-50 rounded-md hover:bg-slate-50/90 border-0 text-zinc-950 font-medium flex justify-center items-center gap-2" type="submit">
                                {
                                    loading?
                                    <>
                                        <div className="w-8 h-8">
                                            <Spinner/>
                                        </div>
                                        <p className="text-base font-medium text-indigo-600">Loading...</p>
                                    </>
                                    :"Post"
                                }
                                </button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>

            </div>
        </>
    );
}


export default CreatePost;
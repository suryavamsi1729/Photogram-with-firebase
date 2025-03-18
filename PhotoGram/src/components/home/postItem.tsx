import { IBasicFCProps, IPostProfiles } from "@/types";
import {Bookmark, Heart, MessageCircle, Send} from "lucide-react";

interface IPostItem extends IBasicFCProps{
    post:IPostProfiles
}

const PostItem: React.FC<IPostItem> = ({post})=>{
    return (
        <div className="w-auto h-auto flex flex-col justify-center items-center gap-[6px]">
            <div className="w-full h-auto flex flex-row justify-start items-center px-2 py-1 gap-2">
                <img src={post.profile?.imgurl} alt={post.profile?.name} className="w-[32px] h-[32px] rounded-full"/>
                <div className="grow h-full flex flex-col justify-center items-start gap-1">
                    <p className="w-full h-full text-base/[16px] font-semibold text-white truncate">{post.profile?.name}</p>
                    <p className="w-full h-full text-sm/[14px] font-normal text-zinc-400 truncate">{post.profile?.adout}</p>
                </div>
                
            </div>
            <div className="w-[440px] h-[480px] border border-zinc-700/40 rounded-xl bg-zinc-500">
                <img alt={post.photos[0].uuid || "image"} src={post.photos[0].cdnUrl || ""} className="w-[440px] h-[480px] object-cover rounded-xl border border-zinc-700/40"/>
            </div>
            <p className="w-full h-auto px-2 truncate text-base/[16px] font-normal text-zinc-400">{post.caption}</p>
            <div className="w-full h-auto flex flex-row justify-start items-center gap-6 px-2 py-2 ">
                <Heart className="h-5 text-white"/>
                <MessageCircle className="h-5 text-white"/>
                <Send className="h-5 text-white"/>
                <div className="grow flex flex-row justify-end items-center">
                    <Bookmark className="h-5 text-white"/>
                </div>
                
            </div>
        </div>
    );
}
export const PostItemSekleton: React.FC = ()=>{
    return (
        <div className="w-auto h-auto flex flex-col justify-center items-center gap-2">
            <div className="w-full h-auto flex flex-row justify-start items-center gap-2 px-2 py-1">
                <div className="relative w-9 h-9 rounded-full ">
                    <div className="animate-pulse absolute inset-0 rounded-full bg-zinc-700/80"></div>
                </div>
                <div className="grow h-full p-1 flex flex-col justify-start items-start gap-2">
                    <div className="relative w-[112px] h-[10px] rounded-lg ">
                        <div className="animate-pulse absolute inset-0 rounded-lg bg-zinc-700/80"></div>
                    </div>
                    <div className="relative w-[78px] h-[10px] rounded-lg ">
                        <div className="animate-pulse absolute inset-0 rounded-lg bg-zinc-700/80"></div>
                    </div>
                </div>
            </div>
            <div className="relative w-[440px] h-[480px] border border-zinc-700/60 rounded-xl">
                <div className="animate-pulse absolute inset-0 rounded-xl bg-zinc-700/80"></div>
            </div>
            <div className="w-full h-10 flex flex-row justify-start items-center gap-2 px-2 ">
                <div className="relative w-8 h-8 rounded-full">
                    <div className="animate-pulse absolute inset-0 rounded-full bg-zinc-700/80"></div>
                </div>
                <div className="relative w-8 h-8 rounded-full">
                    <div className="animate-pulse absolute inset-0 rounded-full bg-zinc-700/80"></div>
                </div>
                <div className="relative w-8 h-8 rounded-full">
                    <div className="animate-pulse absolute inset-0 rounded-full bg-zinc-700/80"></div>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
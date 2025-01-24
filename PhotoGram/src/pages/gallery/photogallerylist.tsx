import { cn } from "@/lib/utils";
import { IBasicFCProps, PostResponse } from "@/types";
import { PhotoGalleryConatiner } from "./photogaller";
import { useOutletContext } from "react-router-dom";
import { HeartIcon } from "lucide-react";

interface IPhotoGalleryList extends IBasicFCProps{

}

const PhotoGalleryList : React.FC<IPhotoGalleryList> = ({className})=>{
    const postdata = useOutletContext<PostResponse[]>();

    return(
        <div className={cn("w-full h-full px-6",className)}>
            <PhotoGalleryConatiner className={`w-full h-auto grid grid-cols-1 gap-4`}>
                <div className="w-full h-auto flex flex-col justify-start items-center divide-y-[2px] divide-zinc-800/80">
                    <div className="w-full h-auto grid grid-cols-12 justify-start items-center gap-4 py-3">
                        <div id={"header-photos"} className="col-span-4 h-auto p-1 font-mono font-medium text-base text-white/40">Photos</div>
                        <div id={"header-caption"} className="col-span-3 h-auto px-4 py-1 font-mono font-medium text-base text-white/40">Caption</div>
                        <div id={"header-likes"} className="col-span-1 h-auto p-1 font-mono font-medium text-base text-white/40">Likes</div>
                        <div id={"header-date"} className="col-span-2 h-auto p-1 font-mono font-medium text-base text-white/40">Uploded Date</div>
                    </div>
                    {
                        postdata.map((post)=>{
                            return(
                                <PhotoGalleryListItem key={post.id} post={post}/>
                            );
                        })
                    }
                </div>
            </PhotoGalleryConatiner>
        </div>
    );
}

interface IPhotoGalleryListItem extends IBasicFCProps{
    post: PostResponse
}

const PhotoGalleryListItem:React.FC<IPhotoGalleryListItem> = ({className,post})=>{
    return(
        
        <div  className={cn(`group relative w-full h-auto grid grid-cols-12 justify-start items-center gap-4 py-3 hover:bg-zinc-800/30`,className)}>
            <div id={"photos"} className="col-span-4 h-full px-1 font-mono font-medium text-base text-white/40">
                <div className="w-full h-full flex flex-row justify-start items-center">
                    <div className="w-full h-full grid grid-cols-12">
                        <div className="col-span-2 h-full flex flex-row justify-start items-center">
                            <div className="w-full h-full flex flex-col justify-center items-center">
                                <div className="w-[22px] h-[22px] flex flex-col justify-center items-center hover:cursor-pointer group-hover:bg-zinc-950 bg-zinc-900/80 border-[2px] border-zinc-700/80 group-hover:border-white rounded">
                                    <svg className={`h-4 fill-white`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-10 h-full flex flex-row justify-start items-center gap-3">
                            {
                                post.photos.slice(0,(post.photos.length<5?post.photos.length:5)).map((photo,index)=>{
                                    return(
                                        <div key={index} id={"image-item"} className="w-auto h-auto flex flex-col justify-center items-center">
                                            <div className="w-14 h-14 p-[2px] bg-zinc-900/90 flex flex-col justify-center items-center rounded-md border-[2px] border-zinc-700/90">
                                                <img className="w-full h-full object-cover rounded" alt={"image"} src={photo.cdnUrl || ""}/>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
            <div id={"caption"} className="col-span-3 h-full flex flex-col justify-center items-start px-4 py-2">
                <div className="w-full h-full flex flex-col justify-center items-start">
                    <p className="w-full h-auto truncate font-mono font-normal text-start text-base text-white/30 group-hover:text-white">
                        {post.caption}
                    </p>
                    
                </div>
            </div>
            <div id={"likes"} className="col-span-1 h-full flex flex-col justify-start items-center px-4 py-2">
                <div className="w-full h-full flex flex-row justify-start items-center gap-2">
                    <p className="w-auto h-auto font-mono font-normal text-base text-white/30 group-hover:text-white">{post.likes}</p>
                    <HeartIcon className="h-5 stroke-transparent fill-red-400"/>
                </div>
            </div>
            <div id={"date"} className="col-span-2 h-full flex flex-col justify-start items-center px-4 py-2">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <p className="w-full h-auto font-mono font-normal truncate text-start text-base text-white/30 group-hover:text-white">
                        {`${post.date}`}
                    </p>
                </div>
            </div>
            <div className="col-span-2 h-full flex flex-col justify-start items-center px-4 py-2">
                <div className="w-full h-full flex flex-row justify-end items-center gap-2">
                    <button className="hidden group-hover:block w-auto h-auto px-4 py-2 bg-zinc-900/70 border-[2px] border-white/30 hover:border-white rounded-md font-mono font-medium text-center text-sm text-white/30 hover:text-white">
                        View
                    </button>
                </div>
            </div>
        </div>

    );
}

export { PhotoGalleryList };
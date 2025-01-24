
import { cn } from "@/lib/utils";
import { IBasicFCProps, PostResponse } from "@/types";
import { HeartIcon} from "lucide-react";
import { useOutletContext } from "react-router-dom";

interface IPhotoGallery extends IBasicFCProps{

}

const PhotoGallery : React.FC<IPhotoGallery> = ({className})=>{
    const postData = useOutletContext<PostResponse[]>();
    
    return(
        <>
            <div id="PhotoGallery" className={cn("w-full h-full px-8 py-6",className)}>
                <PhotoGalleryConatiner>
                    {
                        postData.map((post)=>{
                            return(
                                <PhotoGalleryItem key={post.id} post={post}/>
                            );
                        })
                    }
                </PhotoGalleryConatiner>
            </div>
        </>
    );
}

interface IPhotoGalleryContainer extends IBasicFCProps{
    
}


const PhotoGalleryConatiner : React.FC<IPhotoGalleryContainer> = ({className,children})=>{
    
    return(
            <div className={cn("w-full h-auto grid grid-cols-5 gap-4",className)}>
                {children}
            </div>
    );
}


interface IPhotoGalleryItem extends IBasicFCProps{
    post:PostResponse
}

const PhotoGalleryItem : React.FC<IPhotoGalleryItem> = ({className,post})=>{
    return (
        
        <div key={post.id} className={cn(`group relative w-full h-52 flex flex-col justify-center items-center box-border rounded-xl border-[2px] p-[4px] bg-zinc-900/90 hover:bg-zinc-950 border-zinc-700/90 hover:border-blue-600 overflow-hidden`,className)}>
            <svg className={`${post.photos.length>1?"block":"hidden"} absolute top-3 right-3 w-6 h-6 fill-zinc-950`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, -1, 0, 0)">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                    <g clipPath="url(#a)"> 
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 5h7.795c1.115 0 1.519.116 1.926.334.407.218.727.538.945.945.218.407.334.811.334 1.926V16a1 1 0 1 0 2 0V8.128c0-1.783-.186-2.43-.534-3.082a3.635 3.635 0 0 0-1.512-1.512C18.302 3.186 17.655 3 15.872 3H8a1 1 0 0 0 0 2zm7.721 2.334C15.314 7.116 14.91 7 13.795 7h-7.59c-1.115 0-1.519.116-1.926.334a2.272 2.272 0 0 0-.945.945C3.116 8.686 3 9.09 3 10.205v7.59c0 1.114.116 1.519.334 1.926.218.407.538.727.945.945.407.218.811.334 1.926.334h7.59c1.114 0 1.519-.116 1.926-.334.407-.218.727-.538.945-.945.218-.407.334-.811.334-1.926v-7.59c0-1.115-.116-1.519-.334-1.926a2.272 2.272 0 0 0-.945-.945z"></path> 
                    </g> 
                    <defs> 
                        <clipPath id="a">
                            <path fill="#000000" d="M0 0h24v24H0z"></path> 
                        </clipPath> 
                    </defs> 
                </g>
            </svg>
            <img className="w-full h-full  rounded-[8px]" src={post.photos[0].cdnUrl || ""} alt={post.caption}/>
            <div className="absolute inset-1 rounded-[8px]">
                <div className={`absolute top-full w-full h-full flex flex-col justify-end items-center rounded-[8px] bg-slate-900/80 translate-y-0 group-hover:-translate-y-[197px] transition duration-300 ease-in-out`}>
                    <div className="w-full h-auto flex flex-row justify-between items-center px-2 py-1">
                        <div id="post-caption" className="w-10/12 h-full flex flex-row justify-start items-center">
                            <p className="w-full h-auto font-mono font-medium text-base text-left truncate text-white">
                                {post.caption}
                            </p>
                        </div>
                        <div id={"post-likes"} className="w-auto h-auto p-1 flex flex-row justify-center items-center gap-1">
                            <p className="w-auto h-auto font-mono font-light text-sm text-white text-center">{post.likes}</p>
                            <HeartIcon className={`w-5 h-5 ${post.likes>0?"fill-red-600 stroke-transparent":"fill-transparent stroke-white/60"} `}/>
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                        <button className="group/viewBtn w-auto h-auto px-6 py-1 flex flex-col justify-center items-center bg-transparent border hover:border-[2px] border-white/60 hover:border-white/100 rounded-md">
                            <p className="w-full h-auto font-mono font-medium text-center text-base text-white/60 group-hover/viewBtn:text-white/100">View</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export {PhotoGallery,PhotoGalleryConatiner,PhotoGalleryItem}
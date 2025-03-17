
import { cn } from "@/lib/utils";
import { togglePostFromSelectedPosts } from "@/store/actions";
import { AppDispatch } from "@/store/reducers";
import { selectPostsState } from "@/store/selectors";
import { IBasicFCProps, PostResponse } from "@/types";
import { HeartIcon} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

interface IPhotoGallery extends IBasicFCProps{

}

const PhotoGallery : React.FC<IPhotoGallery> = ({className})=>{
    const {posts,loading}= useSelector(selectPostsState);
    return(
        <>
            <div id="PhotoGallery" className={cn("w-full h-full px-8 py-6",className)}>
                <PhotoGalleryConatiner>
                    {
                        loading?
                        [1,2,3,4,5].map((i)=>{
                            return (<div key={i} className="skeleton-loading-img w-full h-52 box-border rounded-xl border-[2px] border-zinc-700/90"></div>)
                        }):
                        posts.map((post)=>{
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
    const {selectedPosts}= useSelector(selectPostsState);
    const dispatch = useDispatch<AppDispatch>();
    const checkSelect = (postId:String):boolean=>{
        return selectedPosts.some((id)=>id===postId);
    }
    return (
        
        <div key={post.id} className={cn(`group relative w-full h-52 flex flex-col justify-center items-center box-border rounded-xl border-[2px] p-[4px] bg-zinc-900/90 hover:bg-zinc-950  hover:border-blue-600 ${checkSelect(post.id)?"border-blue-600":"border-zinc-700/90"} overflow-hidden`,className)}>
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
            <div onClick={()=>{dispatch(togglePostFromSelectedPosts(post.id))}} className={`w-[22px] h-[22px] absolute top-3 left-3  flex flex-col justify-center items-center hover:cursor-pointer  border-[2px] group-hover:border-white ${checkSelect(post.id)?"border-white bg-blue-600":"border-zinc-900/90 bg-zinc-700/40 "} rounded z-[100]`}>
                <svg className={`${checkSelect(post.id)?"block":"hidden"} w-[18px] h-4 fill-white`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                </svg>
            </div>
            <img className="w-full h-full rounded-[8px]" src={post.photos[0].cdnUrl || ""} alt={post.caption}/>
            <div className="absolute inset-0 rounded-[8px]">
                <div className={`absolute w-full h-full top-full flex flex-col justify-end items-center rounded-[8px] bg-zinc-900/40 translate-y-0 group-hover:-translate-y-full group-hover:backdrop-blur-[2px] transition duration-300 ease-in-out`}>
                    <div className="w-full h-auto flex flex-row justify-between items-center px-2 py-1">
                        <div id="post-caption" className="w-10/12 h-full flex flex-row justify-start items-center">
                            <p className="w-full h-auto font-mono pl-2 py-1 font-medium text-base text-left truncate text-white">
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
import { cn } from "@/lib/utils";
import { IBasicFCProps, OutletPost, PostResponse } from "@/types";
import { PhotoGalleryConatiner } from "./photogaller";
import { useOutletContext } from "react-router-dom";
import { HeartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {deletePost } from "@/repository/post.service";

interface IPhotoGalleryList extends IBasicFCProps{

}



const PhotoGalleryList : React.FC<IPhotoGalleryList> = ({className})=>{
    // const initialPostData = useOutletContext<PostResponse[]>();
    const {postData:initialPostData,setPostData:initialSetPostData,selectedPosts,setSelectedPosts} = useOutletContext<OutletPost>();
    const [postdata, setPostdata] = useState<PostResponse[]>(initialPostData);
    const checkSelect = (id:string|null): boolean =>{
        return selectedPosts.some((post)=>post.id===id);
    }
    const togglePost = (post:PostResponse) =>{
        if(checkSelect(post.id)){
            setSelectedPosts(selectedPosts.filter((newpost)=>{
                return newpost.id!==post.id
            }));
        }
        else{
            setSelectedPosts([...selectedPosts,post]);
        }
    }

    useEffect(()=>{
        setPostdata(initialPostData);
    },[initialPostData]);
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
                                <PhotoGalleryListItem postdata={postdata} setPostdata={setPostdata}  checkSelect={checkSelect} togglePost={togglePost} initialSetPostData={initialSetPostData} key={post.id} post={post}/>
                            );
                        })
                    }
                </div>
            </PhotoGalleryConatiner>
        </div>
    );
}

interface IPhotoGalleryListItem extends IBasicFCProps{
    post: PostResponse,
    togglePost: (post:PostResponse)=>void,
    checkSelect: (id:string)=>boolean,
    postdata: PostResponse[],
    setPostdata : (postdata:PostResponse[])=>void,
    initialSetPostData: (initalPostData:PostResponse[])=>void

}

const PhotoGalleryListItem:React.FC<IPhotoGalleryListItem> = ({className,post,togglePost,checkSelect,postdata,setPostdata,initialSetPostData})=>{

    const handelDelete = async(id:string)=>{
        try {
            await deletePost(id);
            // setPostdata(postdata.filter((post) => post.id !== id));
            initialSetPostData(postdata.filter((post) => post.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    return(
        
        <div  className={cn(`group relative w-full h-auto grid grid-cols-12 justify-start items-center gap-4 py-3 hover:bg-zinc-800/30`,className)}>
            <div id={"photos"} className="col-span-4 h-full px-1 font-mono font-medium text-base text-white/40">
                <div className="w-full h-full flex flex-row justify-start items-center">
                    <div className="w-full h-full grid grid-cols-12">
                        <div className="col-span-2 h-full flex flex-row justify-start items-center">
                            <div className="w-full h-full flex flex-col justify-center items-center">
                                <div onClick={()=>{togglePost(post)}} className={`w-[22px] h-[22px] flex flex-col justify-center items-center hover:cursor-pointer group-hover:bg-zinc-950  border-[2px] group-hover:border-white ${checkSelect(post.id)?"border-white bg-zinc-950":"border-zinc-700/80 bg-zinc-900/80"} rounded`}>
                                    <svg className={`${checkSelect(post.id)?"block":"hidden"} w-[18px] h-4 fill-white`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
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
                    <p className={`w-full h-auto truncate font-mono font-normal text-start text-base group-hover:text-white ${checkSelect(post.id)?"text-white":"text-white/30"}`}>
                        {post.caption}
                    </p>
                    
                </div>
            </div>
            <div id={"likes"} className="col-span-1 h-full flex flex-col justify-start items-center px-4 py-2">
                <div className="w-full h-full flex flex-row justify-start items-center gap-2">
                    <p className={`w-auto h-auto font-mono font-normal text-base group-hover:text-white ${checkSelect(post.id)?"text-white":"text-white/30"}`}>{post.likes}</p>
                    <HeartIcon className="h-5 stroke-transparent fill-red-400"/>
                </div>
            </div>
            <div id={"date"} className="col-span-2 h-full flex flex-col justify-start items-center px-4 py-2">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <p className={`w-full h-auto font-mono font-normal truncate text-start text-base group-hover:text-white ${checkSelect(post.id)?"text-white":"text-white/30"}`}>
                        {`${post.date}`}
                    </p>
                </div>
            </div>
            <div className="col-span-2 h-full flex flex-col justify-start items-center px-4 py-2">
                <div className="w-full h-full flex flex-row justify-end items-center gap-4">
                    <div onClick={()=>{handelDelete(post.id)}} className="hidden group/delete group-hover:flex w-10 h-10  flex-col justify-center items-center rounded-md bg-zinc-900/70 border-[2px] border-white/30 hover:border-white/100 hover:cursor-pointer">
                        <svg className="w-4 h-4 fill-white/30 group-hover/delete:fill-white/100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                        </svg>
                    </div>
                    <button className="hidden group-hover:block w-auto h-auto px-4 py-2 bg-zinc-900/70 border-[2px] border-white/30 hover:border-white rounded-md font-mono font-medium text-center text-sm text-white/30 hover:text-white">
                        View
                    </button>
                </div>
            </div>
        </div>

    );
}

export { PhotoGalleryList };
import { useUseAuth } from "@/context/userAuthContex";
import { cn } from "@/lib/utils";
import { getPostByUserId } from "@/repository/post.service";
import { IBasicFCProps, Post, PostResponse } from "@/types";
import { useEffect, useState } from "react";
interface IPhotoGallery extends IBasicFCProps{

}

const PhotoGallery : React.FC<IPhotoGallery> = ({className})=>{
    const {user} = useUseAuth();
    const [postData,setPostData] = useState<PostResponse[]>([]);

    const getAllPost = async(id:string)=>{
        try{
            const querySnapShot = await getPostByUserId(id);
            const tempArry:PostResponse[] = [];
            if(querySnapShot.size>0){
                querySnapShot.forEach((doc)=>{
                    const data = doc.data() as Post;
                    const responsObj : PostResponse = {
                        id:doc.id,
                        ...data,
                    };
                    tempArry.push(responsObj);
                });
                setPostData(tempArry);
            }
            else{
                console.log("no data");
            }

        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        if(user?.uid != null){
            getAllPost(user.uid);
        }
    },[]);
    return(
        <>
            <div id="PhotoGallery" className={cn("w-full h-full px-8 py-6",className)}>
                <PhotoGalleryConatiner>
                    {
                        postData.map((post)=>{
                            return(
                                <div key={post.id} className="relative w-full h-52 box-border rounded-xl border-[2px] p-[4px] bg-zinc-900/90 border-zinc-700/90 overflow-hidden">
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
                                </div>
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
    
}

const PhotoGalleryItem : React.FC<IPhotoGalleryItem> = ({className})=>{
    return (
        <div className={cn(className)}>

        </div>
    );
}

export {PhotoGallery,PhotoGalleryConatiner,PhotoGalleryItem}
import { useEffect, useState } from "react";
import { getPostByUserId } from "@/repository/post.service";
import { IBasicFCProps, Post, PostResponse } from "@/types";
import { useUseAuth } from "@/context/userAuthContex";
import Layout from "@/components/layout/layout";
import GalleryNavBar from "@/components/navbar/galleryNavBar";
import { Outlet } from "react-router-dom";

interface IGallery extends IBasicFCProps{

}

const Gallery : React.FC<IGallery> = ()=>{
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
            <Layout>
                <div className="w-full h-full flex flex-col justify-start items-center">
                    <div id="header" className="w-full h-auto flex flex-row justify-start items-center gap-4">
                        <div id="galleryNavList" className="grow h-auto flex flex-row justify-start items-center border-b-[2px] border-zinc-800/80">
                            <GalleryNavBar/>
                        </div>
                    </div>
                    <Outlet context={postData} />
                </div>
            </Layout>
        </>
    );
}

export default Gallery;
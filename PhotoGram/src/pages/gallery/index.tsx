import { useEffect, useState } from "react";
import { IBasicFCProps, PostResponse } from "@/types";
import { useUseAuth } from "@/context/userAuthContex";
import Layout from "@/components/layout/layout";
import GalleryNavBar from "@/components/navbar/galleryNavBar";
import { Outlet } from "react-router-dom";
import { getAllPostData, handelMultipleDelets } from "./utile";

interface IGallery extends IBasicFCProps{

}


//change the outlet data passing by craeting the contexapi/redux

const Gallery : React.FC<IGallery> = ()=>{
    const {user} = useUseAuth();
    const [postData,setPostData] = useState<PostResponse[]>([]);
    const [selectedPosts,setSelectedPosts] = useState<PostResponse[]> ([]);

    const MultipleDelete = async ()=>{
        try {
            const data = await handelMultipleDelets(selectedPosts,postData);
            setPostData(data);
            setSelectedPosts([]);
        } 
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const asyncGetPosts = async (id: string) => {
            try {
                const data = await getAllPostData(id); // Fetch posts
                setPostData(data); // Update state with fetched data
                
            } 
            catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };
    
        if (user?.uid) {
            asyncGetPosts(user.uid); // Call the async function with user ID
        }
    }, [user?.uid]); // Re-run effect when `user?.uid` changes
    return(
        <>
            <Layout>
                <div className="w-full h-full flex flex-col justify-start items-center">
                    <div id="header" className="w-full h-auto flex flex-row justify-start items-center gap-4">
                        <div id="galleryNavList" className="grow h-auto flex flex-row justify-start items-center border-b-[2px] border-zinc-800/80">
                            <GalleryNavBar MultipleDelete={MultipleDelete}/>
                        </div>
                    </div>
                    <Outlet context={{
                        postData:postData,
                        setPostData:setPostData,
                        selectedPosts:selectedPosts,
                        setSelectedPosts:setSelectedPosts,
                        }} />
                </div>
            </Layout>
        </>
    );
}

export default Gallery;
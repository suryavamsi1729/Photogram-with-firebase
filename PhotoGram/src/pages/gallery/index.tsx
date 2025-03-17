import { useEffect, useState } from "react";
import { IBasicFCProps, PostResponse } from "@/types";
import Layout from "@/components/layout/layout";
import GalleryNavBar from "@/components/navbar/galleryNavBar";
import { Outlet } from "react-router-dom";
import { handelMultipleDelets } from "./utile";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/reducers";
import { fetchPosts } from "@/store/thunk/postsActions";
import { selectPostSelectedPosts } from "@/store/selectors";
import { deletePostsFromStore } from "@/store/actions";

interface IGallery extends IBasicFCProps{

}


//change the outlet data passing by craeting the contexapi/redux

const Gallery : React.FC<IGallery> = ()=>{
    const [userId,] = useLocalStorage("uid",null);
    const dispatch = useDispatch<AppDispatch>();
    const selectedPosts = useSelector(selectPostSelectedPosts)
    const MultipleDelete = async ()=>{
        try {
            await handelMultipleDelets(selectedPosts);
            dispatch(deletePostsFromStore([...selectedPosts]));
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if(userId){
            dispatch(fetchPosts(userId));
        }
    }, [userId]); // Re-run effect when `user?.uid` changes
    return(
        <>
            <Layout>
                <div className="w-full h-full flex flex-col justify-start items-center">
                    <div id="header" className="w-full h-auto flex flex-row justify-start items-center gap-4">
                        <div id="galleryNavList" className="grow h-auto flex flex-row justify-start items-center border-b-[2px] border-zinc-800/80">
                            <GalleryNavBar MultipleDelete={MultipleDelete}/>
                        </div>
                    </div>
                    <Outlet />
                </div>
            </Layout>
        </>
    );
}

export default Gallery;
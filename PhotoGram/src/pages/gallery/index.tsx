import { useEffect } from "react";
import { IBasicFCProps } from "@/types";
import Layout from "@/components/layout/layout";
import GalleryNavBar from "@/components/navbar/galleryNavBar";
import { Outlet } from "react-router-dom";
import { handelMultipleDelets } from "./utile";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/reducers";
import { fetchPosts } from "@/store/thunk/userPostsActions";
import { selectPostPosts, selectPostsState } from "@/store/selectors";
import { deletePostsFromStore } from "@/store/actions";

interface IGallery extends IBasicFCProps{

}


//change the outlet data passing by craeting the contexapi/redux

const Gallery : React.FC<IGallery> = ()=>{
    const [userId,] = useLocalStorage("uid",null);
    const dispatch = useDispatch<AppDispatch>();
    const userPosts = useSelector(selectPostPosts)
    const {selectedPosts}= useSelector(selectPostsState);
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
        console.log(userPosts);
        if(userId && userPosts.length==0){
            dispatch(fetchPosts(userId));
        }
        console.log(userPosts); 
    }, [userId,userPosts]);
    console.log(userPosts);
    return(
        <>
            <Layout>
                <div className="w-full h-full flex flex-col justify-start items-center">
                    <div id="header" className="z-[100] w-full h-auto sticky top-16 flex flex-row justify-start items-center gap-4">
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
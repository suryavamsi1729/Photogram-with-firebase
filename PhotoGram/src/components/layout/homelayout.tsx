
import { IBasicFCProps } from "@/types";
import {cn} from "../../lib/utils"
import FriendsSuggestionContainer from "../home/friendsSuggestionConatiner";
import PostItem, { PostItemSekleton } from "../home/postItem";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/reducers";
import { selectPostsWithProfilesState } from "@/store/selectors";
import { fetchNextPostsProfiles, fetchPostsProfiles } from "@/store/thunk";
import useLocalStorage from "@/hooks/useLocalStorage";
import useThrottle from "@/hooks/useThrottle";

interface IHomeLayout extends IBasicFCProps{

}



const HomeLayout:React.FC<IHomeLayout> = ({className}) =>{

    const {loading,posts,lastDoc} = useSelector(selectPostsWithProfilesState);
    const [userId,] = useLocalStorage<string | null>("uid",null);
    const dispatch:AppDispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const handleScroll = useThrottle(() => {
        // Get current scroll position and dimensions
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = window.innerHeight;
        const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
        if (scrollPercent >= 95) {
            console.log("hii");
            dispatch(fetchNextPostsProfiles(4,posts[posts.length-1].date,lastDoc));
        }
      }, 800);
    useEffect(()=>{
        if(userId){
            dispatch(fetchPostsProfiles(4));
        }
        },[]);
    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);
        // Cleanup on unmount
        return () => window.removeEventListener('scroll', handleScroll);
    },[handleScroll]);
    return (
        <div ref={containerRef} className={cn("relative w-full h-full flex flex-row justify-center items-start p-3",className)}>
            <div className="grow h-full flex flex-col justify-start items-center gap-3 p-4">
                {posts.map((post)=>{
                        return <PostItem key={post.id} post={post}/>
                    })
                }
                {loading
                ?
                    <>
                        <PostItemSekleton/>
                        <PostItemSekleton/>
                        <PostItemSekleton/>
                        <PostItemSekleton/>
                    </>
                :
                    null
                }
            </div>
            <div className="sticky top-[74px] right-0 w-[360px] h-[calc(100vh-88px)]">
                <FriendsSuggestionContainer/>
            </div>
        </div>
    );
}

export default HomeLayout;
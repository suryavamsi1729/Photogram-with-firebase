import React, { useState } from "react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import StatusBadge, { StatusVariantProps } from "../ui/statusBadge";
import { IBasicFCProps, ProfileSetup } from "@/types"; 
import { addFriend} from "@/repository/profile.service";
import { useUseAuth } from "@/context/userAuthContex";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import { fetchUsers_array, getFriends, getSuggestions } from "@/lib/api";
import { addToFollowing } from "@/store/actions";
import useLocalStorage from "@/hooks/useLocalStorage";

interface IFollowers extends IBasicFCProps{
    follower: ProfileSetup,
    suggestion?:boolean,
    setSuggestion?:(profiles:ProfileSetup[])=>void;
    setFriends?:(profiles:ProfileSetup[])=>void;
}
interface IFollowersContaineer extends IBasicFCProps{
}
interface ISuggestionsContainer extends IBasicFCProps{

}

const FollowerItem : React.FC<IFollowers> = ({className,follower,suggestion,setSuggestion,setFriends,...props})=>{
    const {user} = useUseAuth();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState<boolean>(false);
    const hadelFollowBtn = async (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        setLoading(true);
        try {
            if(user?.uid){
                await addFriend(user?.uid,follower.userId);
                dispatch(addToFollowing(follower.userId));
            }
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }
    return(
        <div id={`${follower.userId}`} {...props} className={cn("group w-full h-auto flex flex-row justify-start items-center gap-4 px-3 py-2 rounded-xl bg-zinc-800/40 hover:bg-zinc-800 hover:cursor-pointer",className)}>
            <img id={`${follower.userId}-photo`} src={follower.imgurl} className="w-[54px] h-[54px] rounded-full object-contain border-2 border-zinc-700 p-[2px]"/>
            <div className="grow h-full flex flex-col justify-center items-center gap-2">
                <div className="w-full h-auto flex flex-row justify-between items-center">
                    <p className="w-full h-auto truncate text-start text-sm/[16px] font-mono font-medium text-zinc-50/80 group-hover:text-white">{follower.name}</p>
                    {suggestion?null:<StatusBadge value={follower.status} dot={"false" as StatusVariantProps["dot"]} status={follower.status.toLowerCase() as StatusVariantProps["status"] }/>}
                </div>
                <div className="w-full h-auto flex flex-row justify-between items-center gap-3">
                    <p className="grow h-auto truncate text-xs/[14px] text-zinc-500 font-medium">SuryaVamsi</p>
                    {suggestion?<button onClick={hadelFollowBtn} className="w-auto h-auto px-4 py-0 rounded-full text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 hover:cursor-pointer">{loading?"loading":"follow"}</button>:null}
                </div>
            </div>
        </div>
    );
}

const FriendsContainer : React.FC<IFollowersContaineer> = ()=>{
    const [friends,setFriends] = useState<ProfileSetup[]>([]);
    const [loading,setLoading] = useState<boolean>(false);
    const user = useSelector((state:RootState)=>state.user);
    const [userId,] = useLocalStorage("uid",null);
    useEffect(()=>{
       const fetchUserFriends = async ()=>{
            setLoading(true);
            try {
                const {users,errorMessage} = await fetchUsers_array();
                if(!errorMessage && userId){
                    setFriends(getFriends(userId,user.following,users));
                }
                else{
                    console.log(errorMessage);
                }
            } catch (error) {
                console.log(error);
            }
            finally{
                setLoading(false);
            }
       }
       fetchUserFriends();
    },[user]);

    return(
        <div className={`w-full h-auto  gap-4 ${friends.length>0 || user.loading?"flex":"hidden"} flex-col justify-start items-center `}>
            <h1 className="w-full h-auto text-start text-white text-2xl font-medium">Friends</h1>
            <div className="w-full h-auto flex flex-col justify-start items-center gap-3 pb-3 ">
                {loading || user.loading?
                    [1,2].map((itm)=>{
                        return(
                        
                            <div key={itm} className="w-full h-auto flex flex-row justify-start items-center gap-4 px-3 py-2 rounded-xl bg-zinc-800/40">
                                <div className="skeleton-loading-img w-[54px] h-[54px] rounded-full bg-zinc-800/60"></div>
                                <div className="grow h-full flex flex-col justify-center items-center gap-3">
                                    <div className="w-full h-auto flex flex-row justify-between items-center">
                                        <p className="skeleton-loading w-full h-[12px] rounded-lg bg-zinc-800/60"></p>
                                    </div>
                                    <div className="w-full h-auto flex flex-row justify-between items-center gap-3">
                                        <p className="skeleton-loading w-full h-[12px] rounded-lg bg-zinc-800/60"></p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                :
                    friends.map((follower)=>{
                        return(
                            <FollowerItem key={follower.userId} follower={follower}/>
                        );
                    })
                }
            </div>
        </div>
    );
}
const SuggestionsContainer : React.FC<ISuggestionsContainer> = ()=>{
    const [suggestions,setSuggestions] = useState<ProfileSetup[]>([]);
    const [userId,] = useLocalStorage("uid",null);
    const [loading,setLoading] = useState<boolean>(false);
    const user = useSelector((state:RootState)=>state.user);
    useEffect(()=>{
       const fetchUserSuggetions = async ()=>{
            setLoading(true);
            try{
                const {users,errorMessage} = await fetchUsers_array();
                if(!errorMessage && userId){
                    setSuggestions(getSuggestions(userId,user.following,users));
                }
                else{
                    console.log(errorMessage);
                }
            }
            catch(error){
                console.log(error);
            }
            finally{
                setLoading(false);
            }
       }
       fetchUserSuggetions();
    },[user]);
    return(
        <div className={`w-full f-auto ${suggestions.length>0 || user.loading?"flex":"hidden"} flex-col justify-start items-center gap-4`}>
            <h1 className="w-full h-auto text-start text-white text-2xl font-medium">Suggestions</h1>
            <div className="w-full h-auto flex flex-col justify-start items-center gap-3 pb-3 ">
                {loading || user.loading?
                [1,2].map((itm)=>{
                    return(
                        <div key={itm} className="w-full h-auto flex flex-row justify-start items-center gap-4 px-3 py-2 rounded-xl bg-zinc-800/40">
                            <div className="skeleton-loading-img w-[54px] h-[54px] rounded-full bg-zinc-800/60"></div>
                            <div className="grow h-full flex flex-col justify-center items-center gap-3">
                                <div className="w-full h-auto flex flex-row justify-between items-center">
                                    <p className="skeleton-loading w-full h-[12px] rounded-lg bg-zinc-800/60"></p>
                                </div>
                                <div className="w-full h-auto flex flex-row justify-between items-center gap-3">
                                    <p className="skeleton-loading w-full h-[12px] rounded-lg bg-zinc-800/60"></p>
                                </div>
                            </div>
                        </div>
                    
                    );
                })
                :
                    suggestions.map((follower)=>{
                        return(
                            <FollowerItem key={follower.userId} follower={follower} suggestion={true}/>
                        );
                    })
                }
            </div>
        </div>
    );
}

export {FollowerItem,FriendsContainer,SuggestionsContainer};
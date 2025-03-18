import "@/components/css/layout.css";
import { IBasicFCProps } from "@/types";
import MainTopNavBar from "../navbar/mainNavBar";
import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/reducers";
import { fetchPostsProfiles, fetchUser } from "@/store/thunk";
import useLocalStorage from "@/hooks/useLocalStorage";


interface ILayout extends IBasicFCProps{

}

const Layout:React.FC<ILayout> = ({className,children})=>{
    const [userId,] = useLocalStorage<string | null>("uid",null);
    const dispatch:AppDispatch = useDispatch();
    useEffect(()=>{
        if(userId){
            dispatch(fetchUser(userId));
        }
    },[userId]);
    return (
        <>
                <div className={`w-full min-h-screen flex flex-col justify-start items-center bg-zinc-950 `}>
                    <MainTopNavBar/>
                    <div className={`w-full min-h-screen pt-16 ${className}`}>
                        {children}
                    </div>

                </div>
        </>
    );
}

export default Layout;
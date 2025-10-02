import "@/components/css/layout.css";
import { IBasicFCProps } from "@/types";
import MainTopNavBar from "../navbar/mainNavBar";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/reducers";
import { fetchUser } from "@/store/thunk";
import useLocalStorage from "@/hooks/useLocalStorage";
import { selectUserState } from "@/store/selectors";


interface ILayout extends IBasicFCProps{

}

const Layout:React.FC<ILayout> = ({className,children})=>{
    const [userId,] = useLocalStorage<string | null>("uid",null);
    const {name} = useSelector(selectUserState);
    const dispatch:AppDispatch = useDispatch();
    useEffect(()=>{
        if(userId && !name){
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
import { NavBar,NavBarItem,NavBarItemsConatiner } from "../ui/navigation";
import { useLocation,useNavigate } from "react-router-dom";
import { Grid3X3Icon } from "lucide-react";
import { navgationCheck } from "@/lib/utils";

interface IGalleryNavBar{

}

const GalleryNavBar : React.FC<IGalleryNavBar> = ()=>{
    const location = useLocation();
    const navigate = useNavigate();

    const navgationLinks = [
        {
            name:"grid",
            link:"/gallery"
        },
    ]

    return(
        <>
            <NavBar className="h-auto relative px-12 py-2 z-50 bg-zinc-950">
                <NavBarItemsConatiner className="grow h-auto flex flex-row justify-start items-center">
                    {
                        navgationLinks.map((item,i)=>{
                            return (
                                <NavBarItem onClick={()=>{navigate(item.link)}} key={i} className={"w-auto h-auto flex flex-col justify-center items-center hover:cursor-pointer"}>
                                    <div className={`group relative w-auto h-full px-4 flex flex-col justify-between items-center`}>
                                        {/* <svg className={`w-9 h-9  group-hover:fill-white ${navgationCheck(location.pathname,item.link)?"fill-white":"fill-white/40"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" >
                                            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h133v-133H200v133Zm213 0h134v-133H413v133Zm214 0h133v-133H627v133ZM200-413h133v-134H200v134Zm213 0h134v-134H413v134Zm214 0h133v-134H627v134ZM200-627h133v-133H200v133Zm213 0h134v-133H413v133Zm214 0h133v-133H627v133Z"/>
                                        </svg> */}
                                        <Grid3X3Icon className={`w-9 h-9  group-hover:fill-white ${navgationCheck(location.pathname,item.link)?"fill-white":"fill-white/40"}`}/>
                                        <div className="absolute -bottom-2 w-full h-[2px] rounded-lg bg-white"></div>
                                    </div>
                                </NavBarItem>
                            );
                        })
                    }
                </NavBarItemsConatiner>
                <NavBarItemsConatiner className="w-auto h-auto flex flex-row justify-end items-center px-4">
                    <div className="group w-9 h-9 flex flex-col justify-center items-center rounded-full border-[2px] border-white/40 hover:border-zinc-300 hover:cursor-pointer">
                        <svg className="w-4 h-4 fill-white/40 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
                        </svg>
                    </div>
                </NavBarItemsConatiner>
                
            </NavBar>
        </>
    );
}


export default GalleryNavBar;
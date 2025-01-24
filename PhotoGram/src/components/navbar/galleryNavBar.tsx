import { NavBar,NavBarItem,NavBarItemsConatiner } from "../ui/navigation";
import { useLocation,useNavigate } from "react-router-dom";
import { Grid3X3Icon,ListIcon } from "lucide-react";
import { cn, navgationCheckSubRoute } from "@/lib/utils";

interface IGalleryNavBar{
    MultipleDelete: ()=>Promise<void>
}

const GalleryNavBar : React.FC<IGalleryNavBar> = ({MultipleDelete})=>{
    const location = useLocation();
    const navigate = useNavigate();
    const NavIconVariant = {
        "stroke":{
            default:"stroke-white/40",
            active:"stroke-white/100",
            hover:"group-hover:stroke-white/100",
        },
        "fill":{
            default:"fill-white/40",
            active:"fill-white/100",
            hover:"group-hover:fill-white/100",
        }
    }
    const navgationLinks = [
        {
            name:"grid",
            link:"/gallery",
            iconComponent:  Grid3X3Icon,
            iconStyleVarient: NavIconVariant["fill"]
        },
        {
            name:"List",
            link:"/gallery/list-view",
            iconComponent:  ListIcon,
            iconStyleVarient: NavIconVariant["stroke"]
        },
    ];

    return(
        <>
            <NavBar className="h-auto relative px-12 pt-2 pb-4 z-50 bg-zinc-950">
                <NavBarItemsConatiner className="grow h-auto flex flex-row justify-start items-center">
                    {
                        navgationLinks.map((item,i)=>{
                            const IconComponent = item.iconComponent
                            return (
                                <NavBarItem onClick={()=>{navigate(item.link)}} key={i} className={"w-auto h-auto flex flex-col justify-center items-center hover:cursor-pointer"}>
                                    <div className={`group relative w-auto h-full px-4 flex flex-col justify-between items-center`}>
                                        <IconComponent className={cn(`w-9 h-9 ${item.iconStyleVarient.hover} ${navgationCheckSubRoute(location.pathname,item.link)?`${item.iconStyleVarient.active}`:`${item.iconStyleVarient.default}`}`)}/>
                                        <div className={`absolute -bottom-4 w-full h-[2px] rounded-lg ${navgationCheckSubRoute(location.pathname,item.link)?"bg-white":"bg-transparent"} `}></div>
                                    </div>
                                </NavBarItem>
                            );
                        })
                    }
                </NavBarItemsConatiner>
                <NavBarItemsConatiner className="w-auto h-auto flex flex-row justify-end items-center px-4 lg:gap-6">
                    <div onClick={()=>{MultipleDelete()}} className="group w-9 h-9 flex flex-col justify-center items-center rounded-md border-[2px] border-white/40 hover:border-zinc-300 hover:cursor-pointer">
                        <svg className="w-4 h-4 fill-white/40 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                        </svg>
                    </div>
                    <div onClick={()=>{navigate("/post/create-post",{state:{from:location}})}} className="group w-9 h-9 flex flex-col justify-center items-center rounded-full border-[2px] border-white/40 hover:border-zinc-300 hover:cursor-pointer">
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
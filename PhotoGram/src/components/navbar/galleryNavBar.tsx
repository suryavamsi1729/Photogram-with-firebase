import { NavBar,NavBarItem,NavBarItemsConatiner } from "../ui/navigation";
import { useLocation,useNavigate } from "react-router-dom";
import { Grid3X3Icon,ListIcon } from "lucide-react";
import { cn, navgationCheckSubRoute } from "@/lib/utils";

interface IGalleryNavBar{

}

const GalleryNavBar : React.FC<IGalleryNavBar> = ()=>{
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
            <NavBar className="h-auto relative px-12 py-2 z-50 bg-zinc-950">
                <NavBarItemsConatiner className="grow h-auto flex flex-row justify-start items-center">
                    {
                        navgationLinks.map((item,i)=>{
                            const IconComponent = item.iconComponent
                            return (
                                <NavBarItem onClick={()=>{navigate(item.link)}} key={i} className={"w-auto h-auto flex flex-col justify-center items-center hover:cursor-pointer"}>
                                    <div className={`group relative w-auto h-full px-4 flex flex-col justify-between items-center`}>
                                        <IconComponent className={cn(`w-9 h-9 ${item.iconStyleVarient.hover} ${navgationCheckSubRoute(location.pathname,item.link)?`${item.iconStyleVarient.active}`:`${item.iconStyleVarient.default}`}`)}/>
                                        <div className={`absolute -bottom-2 w-full h-[2px] rounded-lg ${navgationCheckSubRoute(location.pathname,item.link)?"bg-white":"bg-transparent"} `}></div>
                                    </div>
                                </NavBarItem>
                            );
                        })
                    }
                </NavBarItemsConatiner>
                <NavBarItemsConatiner className="w-auto h-auto flex flex-row justify-end items-center px-4">
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
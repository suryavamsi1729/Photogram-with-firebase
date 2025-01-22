import { NavBar,NavBarItem,NavBarItemsConatiner,BandLogo,UserComp } from "../ui/navigation";
import { useLocation,useNavigate } from "react-router-dom";
import { navgationCheck } from "@/lib/utils";

interface IMainnavBar{

}

const MainTopNavBar : React.FC<IMainnavBar> = ()=>{
    const location = useLocation();
    const navigate = useNavigate();

    const navgationLinks = [
        {
            name:"Home",
            link:"/"
        },
        {
            name:"Explore",
            link:"/expore"
        },
        {
            name:"Post",
            link:"/post"
        },
        {
            name:"Message",
            link:"/message"
        },
        {
            name:"Notification",
            link:"/notification"
        }
    ]

    return(
        <>
            <NavBar className="px-6 py-2 z-50 bg-zinc-950">
                <BandLogo className="relative h-12 leading-[48px] flex flex-col justify-center items-center text-[32px] gap-2 ">
                    <span className="absoulte top-1/2 inline-block leading-normal align-middle pl-6 py-0 text-slate-50 font-medium">LOGO</span>
                </BandLogo>
                <NavBarItemsConatiner>
                    {
                        navgationLinks.map((item,i)=>{
                            return (
                                <NavBarItem onClick={()=>{navigate(item.link)}}  data={item.name} key={i} className={`${navgationCheck(location.pathname,item.link)?"pointer-events-none text-pink-500 opacity-100":"pointer-events-auto text-slate-50"} group h-6  font-normal relative overflow-hidden hover:cursor-pointer  navitem`}>
                                    <span className={`${navgationCheck(location.pathname,item.link)?"opacity-100":"opacity-40"} inline-block text-base translate-y-0 group-hover:-translate-y-6 group-hover:transition group-hover:duration-300 group-hover:ease-in-out`}>
                                        {item.name}
                                    </span>
                                </NavBarItem>
                            );
                        })
                    }
                </NavBarItemsConatiner>
                <UserComp className="justify-end gap-3"/>
            </NavBar>
        </>
    );
}


export default MainTopNavBar;
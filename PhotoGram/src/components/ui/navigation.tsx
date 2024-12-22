import { IBasicFCProps } from "@/types"
import { HTMLAttributes } from "react";

interface INavBar extends IBasicFCProps{

}
interface IBrandIcon extends IBasicFCProps{
    
}
interface INavBarItemsConatiner extends IBasicFCProps{

}
interface INavBarItem extends IBasicFCProps{
    style?: React.CSSProperties,
    data:string,
    onClick?: (e:React.MouseEvent<HTMLDivElement>)=>void,
}
interface IUserComp extends IBasicFCProps{

}

const NavBar:React.FC<INavBar> = ({children,className})=>{
    return (
        <div className={`w-full sticky top-0 ${className}`}>
            <div className="w-full flex justify-start items-center gap-6">
                {children}
            </div>
        </div>
    );
}
const BandLogo:React.FC<IBrandIcon> = ({children,className})=>{
    return (
        <div className={`flex justify-center items-center gap-3 ${className}`}>
            {children}
        </div>
    )
}
const NavBarItemsConatiner:React.FC<INavBarItemsConatiner> = ({children,className})=>{
    return (
        <div className={`grow inline-flex px-5 justify-end items-center md:gap-10 lg:gap-16 ${className}`}>
            {children}
        </div>
    );
}

const NavBarItem:React.FC<INavBarItem> = ({children,className,style,data,onClick})=>{
    return(
        <>
            <div onClick={onClick} data-content={data} className={`${className}`} style={style}>
                {children}
            </div>
        </>
    );
}

const UserComp:React.FC<IUserComp> = ({children,className})=>{
    return (
        <div className={`px-5 flex flex-row items-center ${className}`}>
            {children}
        </div>
    )
}

export {NavBar,BandLogo,NavBarItemsConatiner,NavBarItem,UserComp}

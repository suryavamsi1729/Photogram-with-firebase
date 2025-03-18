import { IBasicFCProps } from "@/types";
import { DropDownContainer,DropDownItem } from "./dropdown";
import { LogOut,Settings,UserRoundPen,MoveRight,BellIcon } from 'lucide-react';
import { useState,useEffect, useRef } from "react";
import { useUseAuth } from "@/context/userAuthContex";
import { cn } from "@/lib/utils";
import { AppDispatch } from "@/store/reducers";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "@/store/actions";
import useLocalStorage from "@/hooks/useLocalStorage";
import { selectUserState } from "@/store/selectors";

interface INavBar extends IBasicFCProps{

}
interface IBrandIcon extends IBasicFCProps{
    
}
interface INavBarItemsConatiner extends IBasicFCProps{

}
interface INavBarItem extends IBasicFCProps{
    style?: React.CSSProperties,
    data?:string,
    onClick?: (e:React.MouseEvent<HTMLDivElement>)=>void,
}
interface IUserComp extends IBasicFCProps{

}

const NavBar:React.FC<INavBar> = ({children,className})=>{
    return (
        <div id="navbar" className={cn("w-full h-auto",className)}>
            <div className="w-full h-auto flex justify-start items-center gap-6">
                {children}
            </div>
        </div>
    );
}
const BandLogo:React.FC<IBrandIcon> = ({children,className})=>{
    return (
        <div id="barandLogo" className={cn("flex justify-center items-center gap-3 ",className)}>
            {children}
        </div>
    )
}
const NavBarItemsConatiner:React.FC<INavBarItemsConatiner> = ({children,className})=>{
    return (
        <div id="navbarItemContainer" className={cn("grow inline-flex px-5 justify-end items-center md:gap-10 lg:gap-16",className)}>
            {children}
        </div>
    );
}

const NavBarItem:React.FC<INavBarItem> = ({children,className,style,data,onClick})=>{
    return(
        <>
            <div id="navbarItem" onClick={onClick} data-content={data} className={cn(className)} style={style}>
                {children}
            </div>
        </>
    );
}

const UserComp:React.FC<IUserComp> = ({className})=>{
    const dipatch:AppDispatch = useDispatch();
    const userInfo = useSelector(selectUserState);
    const {logOut} = useUseAuth();
    const [,setUserId] = useLocalStorage<string | null>("uid",null);

    const [stateDropDown,setStateDropDown] = useState<boolean>(false);
    const [dropDownAnimationState,setdropDownAnimationState] = useState<boolean>(false);
    const profileRef = useRef(null);
    

    const handelLogout = async()=>{
        try{
            await logOut();
            dipatch(deleteUser());
            setUserId(null);
            console.log("successfull logout");
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{;
        document.addEventListener("click",(e)=>{
            if(e.target!== profileRef.current){
                setdropDownAnimationState(false);
                setStateDropDown(false);
            }
        });
        return ()=>{
            document.removeEventListener("click",(e)=>{
                if(e.target!== profileRef.current){
                    setdropDownAnimationState(false);
                    setStateDropDown(false);
                }
            });
        }
    },[]);

    return (
        <div className={`relative px-5 flex flex-row items-center ${className}`}>
            <img ref={profileRef} onClick={()=>{
                setdropDownAnimationState(true);
                setStateDropDown(!stateDropDown);}} 
                src={userInfo.imgurl}
                alt={userInfo.name}
                className="w-9 h-9 rounded-full hover:cursor-pointer border-2 border-zinc-600/60"/>
                
            <p className="w-24 h-full flex flex-col justify-start items-center text-lg font-normal text-pink-500 truncate">{userInfo.name}</p>
            {
                stateDropDown &&
                <DropDownContainer className={`absolute top-10 right-0  bg-zinc-900 rounded-lg z-[200] ${dropDownAnimationState?"animate-dropdownAnimation":"animate-dropdownRemoveAnimation"}`}>
                    <DropDownItem className="group rounded-md p-2 pr-4 hover:pl-5 hover:bg-zinc-700/40 hover:cursor-pointer transition-all duration-300 ease-in-out">
                        <div className="flex justify-start items-center gap-3">
                            <UserRoundPen className="group-hover:text-slate-50 text-slate-50/40 h-5"/>
                            <p className="text-base group-hover:text-slate-50 text-slate-50/40 font-normal">Edit Profile</p>
                        </div>
                        <MoveRight className="w-4 -translate-x-3 text-pink-600/0 group-hover:text-pink-600/75 group-hover:translate-x-0 transition-[transform,color] delay-200 duration-200 ease-out"/>
                    </DropDownItem>
                    <DropDownItem className="group rounded-md p-2 pr-4 hover:pl-5 hover:bg-zinc-700/40 hover:cursor-pointer transition-all duration-300 ease-in-out">
                        <div className="flex justify-start items-center gap-3">
                            <Settings className="group-hover:text-slate-50 text-slate-50/40 h-5"/>
                            <p className="text-base group-hover:text-slate-50 text-slate-50/40 font-normal">Settings</p>
                        </div>
                        <MoveRight className="w-4 -translate-x-3 text-pink-600/0 group-hover:text-pink-600/75 group-hover:translate-x-0 transition-[transform,color] delay-200 duration-200 ease-out"/>
                    </DropDownItem>
                    <DropDownItem className="group rounded-md p-2 pr-4 hover:pl-5 hover:bg-zinc-700/40 hover:cursor-pointer transition-all duration-300 ease-in-out">
                        <div className="flex justify-start items-center gap-3">
                            <BellIcon className="group-hover:text-slate-50 text-slate-50/40 h-5"/>
                            <p className="text-base group-hover:text-slate-50 text-slate-50/40 font-normal">Notifications</p>
                        </div>
                        <MoveRight className="w-4 -translate-x-3 text-pink-600/0 group-hover:text-pink-600/75 group-hover:translate-x-0 transition-[transform,color] delay-200 duration-200 ease-out"/>
                    </DropDownItem>
                    <DropDownItem onClick={handelLogout} className="group rounded-md p-2 pr-4 hover:pl-5 hover:bg-zinc-700/40 hover:cursor-pointer transition-all duration-300 ease-in-out">
                        <div className="flex justify-start items-center gap-3">
                            <LogOut className="group-hover:text-slate-50 text-slate-50/40 h-5"/>
                            <p className="text-base group-hover:text-slate-50 text-slate-50/40 font-normal">Logout</p>
                        </div>
                        <MoveRight className="w-4 -translate-x-3 text-pink-600/0 group-hover:text-pink-600/75 group-hover:translate-x-0 transition-[transform,color] delay-200 duration-200 ease-out"/>
                    </DropDownItem>
                </DropDownContainer>
            }
        </div>
    )
}

export {NavBar,BandLogo,NavBarItemsConatiner,NavBarItem,UserComp}

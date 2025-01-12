import { IBasicFCProps } from "@/types";
import { DropDownContainer,DropDownItem } from "./dropdown";
import { LogOut,Settings,UserRoundPen,MoveRight } from 'lucide-react';
import { useState,useEffect, useRef } from "react";
import { useUseAuth } from "@/context/userAuthContex";

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

const UserComp:React.FC<IUserComp> = ({className})=>{
    const [stateDropDown,setStateDropDown] = useState<boolean>(false);
    const [dropDownAnimationState,setdropDownAnimationState] = useState<boolean>(false);
    const profileRef = useRef(null);
    const {logOut} = useUseAuth();
    const handelLogout = async()=>{
        try{
            await logOut();
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
            <div ref={profileRef} onClick={()=>{
                setdropDownAnimationState(true);
                setStateDropDown(!stateDropDown);}} className="w-7 h-7 bg-slate-50 rounded-full hover:cursor-pointer"></div>
            <p className="text-base font-normal text-pink-500">Surya</p>
            {
                stateDropDown &&
                <DropDownContainer className={`absolute top-10 right-0 z-50 bg-zinc-700/40 rounded-lg ${dropDownAnimationState?"animate-dropdownAnimation":"animate-dropdownRemoveAnimation"}`}>
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

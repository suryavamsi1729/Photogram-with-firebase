import React from "react";
import Loader from "@/components/ui/loader";
import { useUseAuth } from "@/context/userAuthContex";
interface IAuthLayoutProps {
    children:React.ReactElement,
}
const AuthLayout:React.FunctionComponent <IAuthLayoutProps> = ({children}) => {
    const {loading} = useUseAuth();
    return (
        <div className="relative w-screen h-screen flex flex-row justify-center items-center bg-zinc-950">
            {
                loading?<Loader/>:null
            }
            <div className="hidden md:block w-1/2 h-5/6 z-40">
                <div className="relative group w-full h-full grid grid-cols-2 hover:gap-16 gap-5 transition-all duration-700 delay-75">
                    <div className="image-ele-fist w-2/3 aspect-video  place-self-end rounded-xl z-50 bg-[url('assets/image-3.jpeg')] bg-cover bg-center"></div>
                    <div className="image-ele-sec w-[40%] aspect-[9/14] bg-gray-300  self-end rounded-xl z-50 bg-[url('assets/image-1.jpeg')] bg-cover bg-center"></div>
                    <div className="image-ele-third w-[40%] aspect-[9/14] bg-gray-300 justify-self-end rounded-xl z-50 bg-[url('assets/image-2.jpeg')] bg-cover bg-center"></div>
                    <div className="image-ele-fourth w-2/3 aspect-video bg-gray-300 rounded-xl z-50 bg-[url('assets/image-4.jpeg')] bg-cover bg-center"></div>
                    <div className="absolute inset-0 z-40 flex justify-center items-center">
                        <p className="bg-clip-text opacity-0 group-hover:opacity-100 bg-gradient-to-r  from-purple-500 to-pink-500 text-center text-3xl text-transparent font-bold transition-all duration-700 delay-100">PhotoGram</p>
                    </div>
                </div>
            </div>
            <div className="relative w-full md:w-1/2 h-full flex flex-col justify-center items-center z-40">
                <div className="circulargraidents absolute w-64 h-64 bottom-3 left-16 rounded-full z-10"></div>
                <div className="circulargraidents absolute w-48 h-48 top-24 right-16 rounded-full z-10"></div>
                <div className="circulargraidents absolute w-52 h-52 top-24 -left-[90%] rounded-full z-10"></div>
                <div className="absolute inset-0 z-40"></div>
                <div className="absolute max-w-sm rounded-xl bg-zinc-950  text-card-foreground z-40">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
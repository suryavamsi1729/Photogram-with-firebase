import "@/components/css/layout.css";
import { IBasicFCProps } from "@/types";
import MainTopNavBar from "../navbar/mainNavBar";

interface ILayout extends IBasicFCProps{

}

const Layout:React.FC<ILayout> = ({className,children})=>{
    return (
        <>
                <div className={`w-full min-h-screen flex flex-col justify-start items-center bg-zinc-950 ${className}`}>
                    <MainTopNavBar/>
                    <div className="absolute w-full h-full pt-16">
                        {children}
                    </div>
                    
                </div>
        </>
    );
}

export default Layout;
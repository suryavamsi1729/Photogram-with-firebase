import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { IBasicFCProps } from "@/types";

interface IModelBackground extends IBasicFCProps{

}

// const ModelBackground : React.FC<IModelBackground> = ({children,className},ref)=>{
//     return(
//         <div id="ModelBackgroundContainer" className={cn("w-screen h-screen bg-zinc-950/80 flex flex-col justify-center items-center",className)}>
//             {children}
//         </div>
//     );
// }
const ModelBackground = forwardRef<HTMLDivElement, IModelBackground>(
    ({ children, className }, ref) => {
      return (
        <div
          id="ModelBackgroundContainer"
          className={cn(
            "w-screen h-screen bg-zinc-950/80 flex flex-col justify-center items-center",
            className
          )}
          ref={ref}
        >
          {children}
        </div>
      );
    }
  );
  

interface IModelContainer extends IBasicFCProps{

}

// const ModelConatiner : React.FC<IModelContainer> = ({children,className})=>{
//     return(
//         <div id="ModelContainer" className={cn("w-8/12 h-auto p-4 flex flex-col justify-start items-center gap-4 border border-zinc-500 rounded-md",className)}>
//             {children}
//         </div>
//     );
// }
const ModelConatiner  = forwardRef<HTMLDivElement,IModelContainer>(
    ({ children, className },ref)=>{
        return(
            <div 
                id="ModelContainer" 
                className={
                    cn("w-8/12 h-auto p-4 flex flex-col justify-start items-center gap-4 border border-zinc-500 rounded-md",
                    className)
                }
                ref={ref}>
                {children}
            </div>
        );
    }
)

interface IModelHeader extends IBasicFCProps{

}

const ModelHeader : React.FC<IModelHeader> = ({children,className})=>{
    return(
        <div id="ModelHeader" className={cn("w-full h-auto p-2",className)}>
            {children}
        </div>
    );
}

interface IModelBody extends IBasicFCProps{

}

const ModelBody : React.FC<IModelBody> = ({children,className})=>{
    return(
        <div id="ModelBody" className={cn("w-full h-auto p-2 flex flex-col justify-start items-center gap-2",className)}>
            {children}
        </div>
    );
}

interface IModelFooter extends IBasicFCProps{

}

const ModelFooter : React.FC<IModelFooter> = ({children,className})=>{
    return(
        <div id="ModelFooter" className={cn("w-full h-auto p-2",className)}>
            {children}
        </div>
    );
}

export {ModelBackground,ModelConatiner,ModelHeader,ModelBody,ModelFooter}
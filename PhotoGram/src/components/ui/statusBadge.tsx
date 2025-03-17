import { cn } from "@/lib/utils";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

// Define the variant styles
export const statusVarient = cva("", {
    variants: {
        status: {
            active: "text-green-500",
            inactive: "text-zinc-500",
            offline: "text-zinc-500",
        },
        dot:{
            trueActive:"block bg-green-500",
            trueInactive:"block bg-blue-500",   
            trueOflline:" block bg-zinc-500" ,
            false:"hidden"
        }
    },
    defaultVariants: {
        status: "inactive",
    }
});

// Extract the type for props
export type StatusVariantProps = VariantProps<typeof statusVarient>;


interface IStatusBadge extends StatusVariantProps{
    value:string,
    classNmae?:string
}


const StatusBadge:React.FC<IStatusBadge> = ({status,value,classNmae,dot})=>{

    return(
        <>
            <div className={cn("w-auto h-auto flex flex-row justify-start items-center gap-3",classNmae)}>
                <div className={cn("w-2 h-2 rounded-full",statusVarient({dot}))}></div>
                <p className={cn("text-xs/[14px] font-medium",statusVarient({status}))}>{value}</p>
            </div>
        </>
    );

}

export default StatusBadge;
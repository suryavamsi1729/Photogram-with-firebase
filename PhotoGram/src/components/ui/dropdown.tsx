import { IBasicFCProps } from "@/types";


interface IdropdownContainerContainer extends IBasicFCProps{

}
interface IDropDownItem extends IBasicFCProps{
    onClick ?: ()=>void,
}

const DropDownContainer:React.FC<IdropdownContainerContainer> = ({className,children})=>{
    return(
        <>
            <div className={`w-64 flex flex-col gap-1 p-2 ${className}`}>
                {children}
            </div>
        </>
    )
}

const DropDownItem : React.FC <IDropDownItem> = ({className,children,onClick})=>{
    return (
        <div onClick={onClick} className={`w-full h-12 flex justify-between items-center ${className}`}>
            {children}
        </div>
    )
}

export {DropDownContainer,DropDownItem};
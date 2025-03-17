import { IBasicFCProps } from "@/types";
import { cn } from "@/lib/utils";


interface IContainer extends IBasicFCProps{

}

const Conatiner:React.FC<IContainer> = ({className,children})=>{
    return(
        <div className={cn("w-auto h-auto  p-4 flex",className)}>
            {children}
        </div>
    );
}

export default Conatiner;
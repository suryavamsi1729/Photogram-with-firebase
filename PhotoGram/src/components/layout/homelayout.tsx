
import { IBasicFCProps } from "@/types";
import {cn} from "../../lib/utils"
import FriendsSuggestionContainer from "../home/friendsSuggestionConatiner";

interface IHomeLayout extends IBasicFCProps{

}

const HomeLayout:React.FC<IHomeLayout> = ({className}) =>{
    return (
        <div className={cn("relative w-full h-full flex flex-row justify-center items-center p-3",className)}>
            <div className="grow h-full flex flex-col justify-start items-center">

            </div>
            <div className="sticky top-0 right-0 w-[360px] h-full">
                <FriendsSuggestionContainer/>
            </div>
        </div>
    );
}

export default HomeLayout;
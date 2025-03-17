
import { IBasicFCProps } from "@/types";
import {cn} from "../../lib/utils"
import FriendsSuggestionContainer from "../home/friendsSuggestionConatiner";
import { PostItemSekleton } from "../home/postItem";

interface IHomeLayout extends IBasicFCProps{

}

const HomeLayout:React.FC<IHomeLayout> = ({className}) =>{
    return (
        <div className={cn("relative w-full h-full flex flex-row justify-center items-start p-3",className)}>
            <div className="grow h-full flex flex-col justify-start items-center gap-8 p-4">
                <PostItemSekleton/>
                <PostItemSekleton/>
                <PostItemSekleton/>
                <PostItemSekleton/>
            </div>
            <div className="sticky top-[74px] right-0 w-[360px] h-[calc(100vh-88px)]">
                <FriendsSuggestionContainer/>
            </div>
        </div>
    );
}

export default HomeLayout;
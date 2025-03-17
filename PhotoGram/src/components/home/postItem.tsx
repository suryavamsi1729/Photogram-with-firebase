import { IBasicFCProps } from "@/types";

interface IPostItem extends IBasicFCProps{
    
}

const PostItem: React.FC<IPostItem> = ()=>{
    return (
        <div className="w-auto h-auto flex flex-col justify-center items-center gap-2">
            <div className="w-full h-auto flex flex-row justify-start items-center px-2 py-1">
                <div className="w-9 h-9 rounded-full bg-slate-50"></div>
                <p className="grow h-full text-base font-semibold text-white truncate"></p>
            </div>
            <div className="w-[440px] h-[480px] border border-zinc-700/40 rounded-xl bg-zinc-500"></div>
            <div className="w-full h-14 flex flex-row justify-start items-center gap-2 px-2 py-1 "></div>
        </div>
    );
}
export const PostItemSekleton: React.FC<IPostItem> = ()=>{
    return (
        <div className="w-auto h-auto flex flex-col justify-center items-center gap-2">
            <div className="w-full h-auto flex flex-row justify-start items-center gap-2 px-2 py-1">
                <div className="relative w-9 h-9 rounded-full ">
                    <div className="animate-pulse absolute inset-0 rounded-full bg-zinc-700/80"></div>
                </div>
                <div className="grow h-full p-1 flex flex-col justify-start items-start gap-2">
                    <p className="relative w-[112px] h-[10px] rounded-lg ">
                        <div className="animate-pulse absolute inset-0 rounded-lg bg-zinc-700/80"></div>
                    </p>
                    <p className="relative w-[78px] h-[10px] rounded-lg ">
                        <div className="animate-pulse absolute inset-0 rounded-lg bg-zinc-700/80"></div>
                    </p>
                </div>
            </div>
            <div className="relative w-[440px] h-[480px] border border-zinc-700/60 rounded-xl">
                <div className="animate-pulse absolute inset-0 rounded-xl bg-zinc-700/80"></div>
            </div>
            <div className="w-full h-10 flex flex-row justify-start items-center gap-2 px-2 ">
                <div className="relative w-8 h-8 rounded-full">
                    <div className="animate-pulse absolute inset-0 rounded-full bg-zinc-700/80"></div>
                </div>
                <div className="relative w-8 h-8 rounded-full">
                    <div className="animate-pulse absolute inset-0 rounded-full bg-zinc-700/80"></div>
                </div>
                <div className="relative w-8 h-8 rounded-full">
                    <div className="animate-pulse absolute inset-0 rounded-full bg-zinc-700/80"></div>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
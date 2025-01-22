import { useState } from "react";
import Spinner from "@/components/ui/sipinner";
import { useNavigate,useLocation } from "react-router-dom";
interface IPostHome{

}

const PostHome : React.FC<IPostHome> = ()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    return(
        <>
            <div className="w-auto h-full flex flex-col justify-start items-start py-16  gap-8">
                <div className="w-auto h-auto flex flex-col justify-start items-start px-4 py-9 gap-12 ">
                    <h1 className="font-mono text-left font-bold text-5xl text-white">Share Your Story</h1>
                    <h2 className="font-mono text-left font-semibold text-xl text-white">Capture. Create. Share.</h2>
                    <p className="font-mono text-left font-normal text-base text-white">Upload stunning photos, craft engaging captions, and share your cherished moments with a vibrant community eager to see the world through your lens.</p>
                </div>
                <div className="w-full h-auto p-4 flex fle-row justify-start items-center">
                <button onClick={()=>{navigate("/post/create-post",{state:{from:location}})}}  className="w-48 h-10 px-8 py-2 bg-slate-50 rounded-md hover:bg-slate-50/90 border-0 text-zinc-950 font-medium flex justify-center items-center gap-2" type="submit">
                {
                    loading?
                    <>
                        <div className="w-8 h-8">
                            <Spinner/>
                        </div>
                        <p className="text-base font-medium text-indigo-600">Loading...</p>
                    </>
                    :"Create Post"
                }
                </button>
                </div>
            </div>
        </>
    );
}

export default PostHome;
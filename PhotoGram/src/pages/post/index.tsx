import { Outlet } from "react-router-dom";
import Layout from "@/components/layout/layout";
import postbg from "@/assets/videos/postbg2.mp4"
;
interface ICreatePostProps {

}

const Post : React.FC <ICreatePostProps> = ()=>{
    return (
        <>
            <Layout className="absolute min-h-full h-full">
                <div  className="w-full h-full relative">
                    <video className="absolute -left-80 w-full h-full object-cover" muted loop autoPlay src={postbg}/>
                    <div className=" absolute inset-0 radialGradient">
                        <div className="w-full h-full flex flex-row justify-end items-center">
                            <div className="w-5/12 h-full flex flex-col justify-start items-center px-9 py-4">
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Post;


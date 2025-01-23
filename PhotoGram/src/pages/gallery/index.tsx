import Layout from "@/components/layout/layout";
import GalleryNavBar from "@/components/navbar/galleryNavBar";

interface IGallery{

}

const Gallery : React.FC<IGallery> = ()=>{

    return(
        <>
            <Layout>
                <div className="w-full h-full flex flex-col justify-start items-center">
                    <div id="header" className="w-full h-auto flex flex-row justify-start items-center gap-4">
                        <div id="galleryNavList" className="grow h-auto flex flex-row justify-start items-center border-b-[2px] border-zinc-800/80">
                            <GalleryNavBar/>
                        </div>
                        {/* <div className="w-auto h-auto flex flex-row justify-end items-center px-4">
                            <div className="group w-10 h-10 flex flex-col justify-center items-center rounded-full border-[2px] border-white/40 hover:border-zinc-300 hover:cursor-pointer">
                                <svg className="w-4 h-4 fill-white/40 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
                                </svg>
                            </div>
                        </div> */}
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Gallery;
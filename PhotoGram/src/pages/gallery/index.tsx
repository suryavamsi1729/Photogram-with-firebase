import Layout from "@/components/layout/layout";
import GalleryNavBar from "@/components/navbar/galleryNavBar";
import { PhotoGallery } from "./photogaller";

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
                    </div>
                    <PhotoGallery/>
                </div>
            </Layout>
        </>
    );
}

export default Gallery;
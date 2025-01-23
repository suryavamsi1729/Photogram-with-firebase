import { cn } from "@/lib/utils";
import { IBasicFCProps } from "@/types";
interface IPhotoGallery extends IBasicFCProps{

}

const PhotoGallery : React.FC<IPhotoGallery> = ({className})=>{

    return(
        <>
            <div id="PhotoGallery" className={cn("w-full h-full p-4",className)}>
                <div className="w-full h-auto grid grid-cols-4 gap-4">
                    
                </div>
            </div>
        </>
    );
}

export default PhotoGallery;
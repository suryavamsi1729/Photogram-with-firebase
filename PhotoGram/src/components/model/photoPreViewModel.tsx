import { useEffect,useRef } from "react";
import { FileEntry, IBasicFCProps } from "@/types";
import { ModelBackground,ModelConatiner,ModelBody } from "../ui/model";
import { UUID } from "crypto";
import { OutputFileEntry } from "@uploadcare/react-uploader";

interface IPhotoPreViewModel extends IBasicFCProps{
    data:FileEntry,
    isOpen:boolean,
    setOpen: (isOpen: boolean) => void,
    handleRemoveClick :(uuid: OutputFileEntry['uuid'])=>void,
}

const PhotoPreViewModel : React.FC<IPhotoPreViewModel> = ({data,isOpen,setOpen,handleRemoveClick}) =>{
    const modelBgref = useRef(null);
    const modelcontainerref = useRef(null);
    useEffect(()=>{
        document.addEventListener("click",(e)=>{
            if(e.target===modelBgref.current){
                setOpen(false);
            }
        })
        return (
            ()=>{
                document.removeEventListener("click",(e)=>{
                    if(e.target===modelBgref.current){
                        setOpen(false);
                    }
                })
            }
        );
    },[])
    return(

        <>
            <ModelBackground ref={modelBgref} className={`fixed top-0 left-0 w-screen h-screen bg-zinc-950/90 z-50  ${isOpen?"flex flex-col justify-center items-center":"hidden"}`}>
                <ModelConatiner ref={modelcontainerref} className="w-8/12 h-auto p-8  border  border-zinc-400 rounded-md flex flex-col justify-center items-center">
                    <ModelBody className="w-full h-auto grid grid-cols-4 gap-4">
                        {
                            data.files.map((image,index)=>{
                                return(
                                    <div className="w-full h-36 relative">
                                        <img key={index} className="absolute w-full h-36 rounded" src={image.cdnUrl || ""} alt={image.name}/>
                                        <div onClick={()=>{handleRemoveClick(image.uuid)}} className="group absolute z-20 -top-2 -right-2 w-4 h-4 flex flex-col bg-white  hover:bg-red-600 rounded-full justify-center items-center hover:cursor-pointer">
                                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                                <path className="fill-zinc-950 group-hover:fill-white"  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                            </svg>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </ModelBody>
                </ModelConatiner>
            </ModelBackground>
        </>

    );
}

export default PhotoPreViewModel;
import {useRef, useState } from "react";
import { FileEntry, IBasicFCProps } from "@/types";
import { ModelBackground,ModelConatiner,ModelBody, ModelHeader } from "../ui/model";
import { OutputFileEntry } from "@uploadcare/react-uploader";

interface IPhotoPreViewModel extends IBasicFCProps{
    data:FileEntry,
    isOpen:boolean,
    setOpen: (isOpen: boolean) => void,
    handleRemoveClick :(uuid: OutputFileEntry['uuid'])=>void,
    setFileEntry: (fileEntry:FileEntry)=>void
}

const PhotoPreViewModel : React.FC<IPhotoPreViewModel> = ({data,isOpen,setOpen,handleRemoveClick,setFileEntry}) =>{
    const modelBgref = useRef(null);
    const modelcontainerref = useRef(null);
    const [removeFiles,setRemoveFiles] = useState<FileEntry>({
        files:[],
        }
    )
    const checkSelect = (uuid:string|null): boolean =>{
        return removeFiles.files.some((image)=>image.uuid===uuid)
    }
    const selectImage = (image:OutputFileEntry) =>{
        if(checkSelect(image.uuid)){
            setRemoveFiles({files:removeFiles.files.filter((file)=>{
                return file.uuid!==image.uuid
            })});
        }
        else{
            setRemoveFiles({files:[...removeFiles.files,image]});
        }
    }
    const RemoveMultpleImages = ()=>{
        setFileEntry({files:data.files.filter((img)=> !removeFiles.files.includes(img))});
        setRemoveFiles({files:[]});
    }
    return(
        <>
            <ModelBackground ref={modelBgref} className={`fixed top-0 left-0 w-screen h-screen bg-zinc-950 z-50  ${isOpen?"flex flex-col justify-center items-center":"hidden"}`}>
                <ModelConatiner ref={modelcontainerref} className="w-full h-full bg-zinc-950 px-8 py-4 flex flex-col justify-start items-center gap-0">
                    <ModelHeader className="w-full h-auto px-0 py-2">
                        <div className="w-full h-auto flex flex-row justify-end items-center gap-16">
                            <div onClick={()=>RemoveMultpleImages()} className="group w-8 h-8 bg-zinc-900 flex flex-col justify-center items-center border-[2px] border-zinc-700/90  rounded-sm hover:border-white hover:cursor-pointer">
                                <svg className="w-4 h-4 fill-zinc-600 group-hover:fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                </svg>
                            </div>
                            <div onClick={()=>{setOpen(false)}} className="w-8 h-8 bg-zinc-900 flex flex-col justify-center items-center ">
                                <svg className="w-6 h-6 fill-white stroke-zinc-950" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                                </svg>
                            </div>
                        </div>
                    </ModelHeader>
                    <ModelBody className="w-full h-auto px-0 py-2 overflow-y-auto bg-zinc-950 grid grid-cols-6 gap-8">
                        {
                            data.files.map((image,index)=>{
                                return(
                                    <div key={image.uuid}  className={`group relative w-full h-36 bg-zinc-900/90  ${checkSelect(image.uuid)?"border-[3px] border-blue-600":"border-[2px] border-zinc-700/90"} rounded-md flex flex-col justify-center items-center overflow-hidden`}>
                                        <div className={`absolute w-full h-full`}>
                                            <img className="w-full h-full object-contain " key={index} src={image.cdnUrl || ""} alt={image.name}/>
                                        </div>
                                        <div className="absolute inset-0 hidden group-hover:flex group-hover:flex-col justify-center items-center group-hover:bg-slate-900/85 ">
                                            <div onClick={()=>{handleRemoveClick(image.uuid)}} className="absolute w-8 h-8 flex flex-col justify-center items-center hover:cursor-pointer hover:rounded-sm hover:border-[2px] hover:border-white ">
                                                <svg className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                                </svg>
                                            </div>
                                            <div onClick={()=>{
                                                selectImage(image);
                                            }} className="absolute top-2 left-2 w-5 h-5 flex flex-col justify-center items-center px-[2px] rounded-sm bg-white hover:cursor-pointer">
                                                <svg className={`${checkSelect(image.uuid)?"block":"hidden"} h-4 fill-blue-600`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                    <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                                                </svg>
                                            </div>
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
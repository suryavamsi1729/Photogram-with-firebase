import { useState,useRef,useCallback, useEffect} from 'react';
import { FileEntry } from '@/types';
import { FileUploaderRegular, OutputCollectionState, OutputFileEntry,UploadCtxProvider } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import { cn } from '@/lib/utils';

interface IFileUploder{
    fileEntry: FileEntry,
    onChange: (fileEntry:FileEntry)=>void,
    isOpen?:boolean,
    setOpen:(isOpen:boolean)=>void,
    className?:string
}
interface IProfileUploder extends IFileUploder{
}



const FileUploder:React.FC<IFileUploder> = ({fileEntry,onChange,setOpen,className}) =>{
    const ctxProviderRef = useRef<InstanceType<UploadCtxProvider>>(null);
    const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry<'success'>[]>([]);

    const handleRemoveClick = useCallback(
        (uuid: OutputFileEntry['uuid']) => onChange({files:fileEntry.files.filter(f => f.uuid !== uuid)}),
        [fileEntry, onChange],
      );

    const resetUploaderState = () => ctxProviderRef.current?.uploadCollection.clearAll();
    const handleModalCloseEvent = () => {
        resetUploaderState();
    
        onChange({ files: [...fileEntry.files, ...uploadedFiles] })
    
        setUploadedFiles([]);
      };
      const handleChangeEvent = (files:OutputCollectionState) => {
        setUploadedFiles([...files.allEntries.filter(f => f.status === 'success')] as OutputFileEntry<'success'>[]);
      }
    
    return(
        <div className={cn(`w-full h-auto flex flex-col justify-start items-start gap-4`,className)}>
            <FileUploaderRegular
                imgOnly={true}
                multiple={true}
                removeCopyright={true}
                confirmUpload={false}
                apiRef={ctxProviderRef}
                sourceList="local, url, camera, gdrive, gphotos"
                classNameUploader="uc-dark"
                pubkey="2bd2b6e865d9925f590b"
                onModalClose={handleModalCloseEvent}
                onChange={handleChangeEvent}
            />
            
            <div className={`w-full h-24 pt-2 ${fileEntry.files.length===0?"hidden":"block"}`}>
                <div className="w-full h-full grid grid-cols-4 gap-4">
                    {
                        fileEntry.files.slice(0,(fileEntry.files.length<4?fileEntry.files.length:4)).map((image,index)=>{
                            return(
                                <div key={image.uuid} className="w-full h-24 relative">
                                    <img className="w-full h-full rounded-md z-10"  src={`${image.cdnUrl}-/preview/600x800/-/format/auto/-/quality/smart/` || ''} alt={image.name}/>
                                    {
                                        index===3?
                                        <div onClick={()=>{setOpen(true)}} className={`${fileEntry.files.length>4?"block":"hidden"} w-full h-full absolute inset-0 rounded-md bg-slate-900/85 flex flex-col justify-center items-center font-mono font-semibold text-base text-white hover:cursor-pointer`}>
                                            {`+ ${fileEntry.files.length-3}`}
                                        </div>:
                                        <div onClick={() => handleRemoveClick(image.uuid)} className="absolute z-20 -top-2 -right-2 w-4 h-4 flex flex-col bg-slate-400/95 rounded-full justify-center items-center hover:cursor-pointer">
                                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                                <path className="stroke-zinc-950" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                                            </svg>
                                        </div>
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
export const ProfileUploder:React.FC<IProfileUploder> = ({fileEntry,onChange,className}) =>{
    const ctxProviderRef = useRef<InstanceType<UploadCtxProvider>>(null);
    useEffect(()=>{
        console.log(ctxProviderRef.current);
    },[]);
    const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry<'success'>[]>([]);

    const resetUploaderState = () => ctxProviderRef.current?.uploadCollection.clearAll();
    const handleModalCloseEvent = () => {
        resetUploaderState();
    
        onChange({ files: [...fileEntry.files, ...uploadedFiles] })
    
        setUploadedFiles([]);
      };
      const handleChangeEvent = (files:OutputCollectionState) => {
        setUploadedFiles([...files.allEntries.filter(f => f.status === 'success')] as OutputFileEntry<'success'>[]);
      }
    
    return(
            <FileUploaderRegular
                className={cn(`profileuploder`,className)}
                imgOnly={true}
                multiple={false}
                removeCopyright={true}
                confirmUpload={false}
                apiRef={ctxProviderRef}
                sourceList="local, url, camera, gdrive, gphotos"
                classNameUploader="uc-dark"
                pubkey="2bd2b6e865d9925f590b"
                onModalClose={handleModalCloseEvent}
                onChange={handleChangeEvent}
            />
    );
}

export default FileUploder;
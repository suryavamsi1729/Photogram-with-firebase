import { useState,useRef } from 'react';
import { FileEntry } from '@/types';
import { FileUploaderRegular, OutputFileEntry,UploadCtxProvider } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

interface IFileUploder{
    fileEntry: FileEntry,
    onChange: (fileEntry:FileEntry)=>void,
}



const FileUploder:React.FC<IFileUploder> = ({fileEntry,onChange}) =>{
    const ctxProviderRef = useRef<InstanceType<UploadCtxProvider>>(null);
    const [uploadedFiles, setUploadedFiles] = useState<OutputFileEntry<'success'>[]>([]);

    const resetUploaderState = () => ctxProviderRef.current?.uploadCollection.clearAll();
    const handleModalCloseEvent = () => {
        resetUploaderState();
    
        onChange({ files: [...fileEntry.files, ...uploadedFiles] })
    
        setUploadedFiles([]);
      };
    
    return(
        <div>
            <FileUploaderRegular
                apiRef={ctxProviderRef}
                sourceList="local, url, camera, gdrive, gphotos"
                classNameUploader="uc-dark"
                pubkey="2bd2b6e865d9925f590b"
                onModalClose={handleModalCloseEvent}
            />
            


        </div>
    );
}

export default FileUploder;
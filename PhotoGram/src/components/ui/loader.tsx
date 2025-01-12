import "../css/loader.css";

interface ILoader{
    
}

const Loader:React.FC<ILoader> = ()=>{
    return (
        <>
            <div className="w-screen h-screen absolute top-0 left-0 bg-zinc-950 backdrop-blur-sm z-50">
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="loadingdiv1 absolute bg-blue-600 rounded-full w-6 h-6 blur-[5px]"></div>
                    <div className="loadingdiv2 absolute bg-fuchsia-600 rounded-full w-6 h-6 blur-[5px]"></div>
                </div>
            </div>
        </>
    );
}

export default Loader;
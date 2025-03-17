import "../css/cmerashetterLoder.css";

interface ICmerashetterLoader{
    
}

const CmerashetterLoader:React.FC<ICmerashetterLoader> = ()=>{
    return (
        <>
            <div className="w-screen h-screen absolute top-0 left-0 bg-zinc-950">
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="w-[120px] h-[120px] relative rounded-full bg-white flex justify-center items-center ring-4 ring-black ring-offset-4 overflow-hidden">   
                        <div className="plates-container w-[300px] h-[300px] absolute ">
                            <svg className="shetter-plates absolute origin-top-center left-[57.5px] top-[150px]" width="185" height="160" viewBox="0 0 185 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.73321 159L92.5 1.998L183.267 159H1.73321Z" fill="black" stroke="white" stroke-width="2"/>
                            </svg>
                            <svg className="shetter-plates absolute origin-top-center left-[57.5px] top-[150px] rotate-60" width="185" height="160" viewBox="0 0 185 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.73321 159L92.5 1.998L183.267 159H1.73321Z" fill="black" stroke="white" stroke-width="2"/>
                            </svg>
                            <svg className="shetter-plates absolute origin-top-center left-[57.5px] top-[150px] rotate-120" width="185" height="160" viewBox="0 0 185 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.73321 159L92.5 1.998L183.267 159H1.73321Z" fill="black" stroke="white" stroke-width="2"/>
                            </svg>
                            <svg className="shetter-plates absolute origin-top-center left-[57.5px] top-[150px] rotate-180" width="185" height="160" viewBox="0 0 185 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.73321 159L92.5 1.998L183.267 159H1.73321Z" fill="black" stroke="white" stroke-width="2"/>
                            </svg>
                            <svg className="shetter-plates absolute origin-top-center left-[57.5px] top-[150px] rotate-240" width="185" height="160" viewBox="0 0 185 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.73321 159L92.5 1.998L183.267 159H1.73321Z" fill="black" stroke="white" stroke-width="2"/>
                            </svg> 
                            <svg className="shetter-plates absolute origin-top-center left-[57.5px] top-[150px] rotate-300" width="185" height="160" viewBox="0 0 185 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.73321 159L92.5 1.998L183.267 159H1.73321Z" fill="black" stroke="white" stroke-width="2"/>
                            </svg>
                        </div>
                        {/* <div className="w-4 h-4 z-50 bg-red-800"></div> */}
                        <div className="absolute z-[100] w-full h-full bg-stone-100/20 backdrop-blur-[1px] rounded-full "></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CmerashetterLoader;
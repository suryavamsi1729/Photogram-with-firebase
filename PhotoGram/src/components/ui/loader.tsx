import "../css/loader.css";
import { useEffect } from "react";

interface ILoader{
    
}

const Loader:React.FC<ILoader> = ()=>{
    // useEffect(() => {
    //     // Array of colors to cycle through
    //     const colors = ["#c520f3", "#6c14f1", "#1de3f1"];
    //     let index1 = 0;
    //     let index2 = 1; // Start with different indices for the two variables
    
    //     // Function to update CSS variables
    //     const updateColors = () => {
    //       document.documentElement.style.setProperty("--color1", colors[index1]);
    //       document.documentElement.style.setProperty("--color2", colors[index2]);
    
    //       // Increment indices in a circular fashion
    //       index1 = (index1 + 1) % colors.length;
    //       index2 = (index2 + 1) % colors.length;
    //     };
    
    //     // Start interval to update colors every 2 seconds
    //     const interval = setInterval(updateColors, 2000);
    
    //     return () => clearInterval(interval); // Cleanup on component unmount
    //   }, []);
    return (
        <>
            <div className="w-screen h-screen absolute bg-zinc-950 backdrop-blur-sm z-50">
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="loadingdiv1 absolute bg-blue-600 rounded-full w-6 h-6 blur-[5px]"></div>
                    {/* <div className="loadingdiv3 absolute bg-purple-600 rounded-full w-6 h-6 blur-[5px]"></div> */}
                    <div className="loadingdiv2 absolute bg-fuchsia-600 rounded-full w-6 h-6 blur-[5px]"></div>
                </div>
            </div>
        </>
    );
}

export default Loader;
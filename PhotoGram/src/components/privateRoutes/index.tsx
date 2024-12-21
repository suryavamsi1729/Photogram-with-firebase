import { Navigate,useLocation,Outlet } from "react-router-dom";
// import { useUseAuth } from "@/context/userAuthContex";
import Loader from "../ui/loader";
import useAuthStateChange from "@/hooks/useauthstatechange";

export function PrivateRoute (){
    const location = useLocation();
    const {user,loading} = useAuthStateChange();
    return (
        <>
            {/* state is use to pass the data  */}
            {
                loading?<Loader/>:user?(<Outlet/>):<Navigate to={"/login"} state={{from : location}}/>
            }
            
        </>
    );
}
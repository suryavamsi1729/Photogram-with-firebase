import { Navigate,useLocation,Outlet } from "react-router-dom";
import { useUseAuth } from "@/context/userAuthContex";

export function PrivateRoute (){
    const {user} = useUseAuth();
    const location = useLocation();
    return (
        <>
            {/* state is use to pass the data  */}
            {user?(<Outlet/>):<Navigate to={"/login"} state={{from : location}}/>}
        </>
    );
}
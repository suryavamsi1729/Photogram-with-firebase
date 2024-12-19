import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Error from "./pages/error";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Post from "./pages/post";
import Photos from "./pages/photos";
import Profile from "./pages/profile";
import PasswordReset from "./pages/login/passwordReset";
import { PrivateRoute } from "./components/privateRoutes";


export const router = createBrowserRouter([
    {
        path:"/login",
        element:<Login/>,
        errorElement:<Error/>
    },
    {
        path:"/signup",
        element:<Signup/>,
        errorElement:<Error/>
    },
    {
        path:"/passwordreset",
        element:<PasswordReset/>,
        errorElement:<Error/>
    },
    {
        element: <PrivateRoute/>,//wraps the routes below and protect them
        children : [
            {
                path: "/",
                element:<Home/>,
                errorElement:<Error/>
            },
            {
                path:"/post",
                element:<Post/>,
                errorElement:<Error/>
            },
            {
                path:"/photos",
                element:<Photos/>,
                errorElement:<Error/>
            },
            {
                path:"/profile",
                element:<Profile/>,
                errorElement:<Error/>
            }
        ],
    },
    
])
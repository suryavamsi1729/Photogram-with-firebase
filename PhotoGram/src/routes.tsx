import { createBrowserRouter } from "react-router-dom";
import Error from "./pages/error";
import Login from "./pages/login";
import PasswordReset from "./pages/login/forgotPassword";
import Verification from "./pages/verification/inde";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Post from "./pages/post";
import PostHome from "./pages/post/home";
import CreatePost from "./pages/post/create";
import { PrivateRoute } from "./components/privateRoutes";
import Gallery from "./pages/gallery";
import { PhotoGallery } from "./pages/gallery/photogaller";
import { PhotoGalleryList } from "./pages/gallery/photogallerylist";


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
        path:"/forgot-password",
        element:<PasswordReset/>,
        errorElement:<Error/>
    },
    {
        path:"/auth/action",
        element:<Verification/>,
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
                errorElement:<Error/>,
                children:[
                    {
                        path:"",
                        element:<PostHome/>,
                        errorElement:<Error/>
                    },
                    {
                        path:"create-post",
                        element:<CreatePost/>,
                        errorElement:<Error/>
                    }

                ]
            },
            {
                path: "/gallery",
                element:<Gallery/>,
                errorElement:<Error/>,
                children:[
                    {
                        path:"",
                        element:<PhotoGallery/>,
                        errorElement:<Error/>
                    },
                    {
                        path:"list-view",
                        element:<PhotoGalleryList/>,
                        errorElement:<Error/>
                    },

                ]
            },
        ],
    },
    
])
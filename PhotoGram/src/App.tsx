import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { UserAuthProvider } from "./context/userAuthContex";
import CameraLoading from "./components/ui/cameraloding";
function App() {

  return (
    <>
      {/* <UserAuthProvider>
        <RouterProvider router={router} />
      </UserAuthProvider> */}
      <CameraLoading/>
    </>
  )
}

export default App

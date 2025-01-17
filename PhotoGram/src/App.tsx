import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import { UserAuthProvider } from "./context/userAuthContex";
import CmerashetterLoader from "./components/ui/cmerashetterLoder";
function App() {

  return (
    <>
      {/* <UserAuthProvider>
        <RouterProvider router={router} />
      </UserAuthProvider> */}
      <CmerashetterLoader />
    </>
  )
}

export default App

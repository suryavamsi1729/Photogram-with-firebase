import AuthLayout from "@/components/ui/authLayout";
import ResetPassword from "../login/resetPassword";
import VerifyEmail from "../signup/verifyEmail";
import { useLocation } from "react-router-dom";
interface IVerifcationProps{

}
const Verification: React.FC<IVerifcationProps> = ()=>{
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const mode = urlParams.get("mode");
    return(
        <AuthLayout>
            {
                mode === "verifyEmail"?<VerifyEmail/>:null
            }
            {
                mode === "resetPassword"?<ResetPassword/>:null
            }

        </AuthLayout>
    );

}

export default Verification;
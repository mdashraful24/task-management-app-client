import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                // console.log(result.user);
                const userInfo = {
                    id: result.user?.uid,  // User ID
                    email: result.user?.email,  // Email
                    name: result.user?.displayName  // Display Name
                };
                // console.log(userInfo);
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        // console.log(res.data);
                        toast.success("Successfully Signed In with Google");
                        navigate(from, { replace: true });
                    })
                    .catch(error => {
                        console.error("Google Sign-In Error:", error);
                        toast.error(error.message || "Google Sign-In failed.");
                    });
            });
    };

    return (
        <div className="text-center">
            <button
                onClick={handleGoogleSignIn}
                className="btn btn-sm bg-blue-900 hover:bg-blue-950 text-white hover:dark:text-white border-none"
            >
                Sign In
            </button>
        </div>
    );
};

export default SocialLogin;
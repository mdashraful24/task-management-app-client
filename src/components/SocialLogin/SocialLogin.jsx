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
                const userInfo = {
                    id: result.user?.uid,
                    email: result.user?.email,
                    name: result.user?.displayName
                };
                toast.success("Successfully Signed In with Google", {
                    position: "top-right",
                });
                axiosPublic.post('/users', userInfo)
                    .then(res => {
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
                className="btn btn-sm bg-blue-300 hover:bg-blue-400 md:text-base text-black border-none"
            >
                Sign In
            </button>
        </div>
    );
};

export default SocialLogin;
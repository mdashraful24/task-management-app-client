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
                    email: result.user?.email,
                    name: result.user?.displayName,
                    image: result.user?.photoURL,
                    phone: "888888",
                    role: 'student',
                    joinedDate: new Date().toISOString()
                };
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
        <div className="text-center w-11/12 mx-auto">
            <button
                onClick={handleGoogleSignIn}
                className="btn btn-outline w-full font-medium border-blue-600"
            >
                Sign in with Google
            </button>
        </div>
    );
};

export default SocialLogin;

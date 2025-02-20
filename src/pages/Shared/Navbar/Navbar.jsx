import logo from '../../../assets/logo.png';
import alt from '../../../assets/auth/profile.png';
import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import DarkMode from '../DarkMode/DarkMode';
import SocialLogin from '../../../components/SocialLogin/SocialLogin';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const profileDropdownRef = useRef(null);
    const navigate = useNavigate();

    // Close the profile dropdown when the user changes
    useEffect(() => {
        setProfileDropdownOpen(false);
    }, [user]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setProfileDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSignOut = () => {
        logOut()
            .then(() => {
                toast.success("User signed out successfully", {
                    position: "top-right",
                });
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    // Scroll to Home Section
    const scrollToHome = () => {
        navigate("/");
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
    };

    const links = (
        <>
            {/* <li>
                <NavLink to="/" onClick={() => setMenuOpen(false)}>
                    Home
                </NavLink>
            </li> */}
        </>
    );

    return (
        <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg">
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost hidden pl-0"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        {menuOpen && (
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                                onClick={() => setMenuOpen(false)}
                            >
                                {links}
                            </ul>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={scrollToHome}
                            className="flex items-center gap-2"
                        >
                            <img src={logo} alt="siteLogo" className="w-8 md:w-12" />
                            <h2 className="block md:hidden lg:block text-lg md:text-3xl font-extrabold text-white"></h2>
                        </button>
                    </div>
                </div>
                <div className="navbar-center hidden md:flex">
                    <ul className="menu menu-horizontal px-1 text-white">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? (
                        <div className="relative dropdown-container" ref={profileDropdownRef}>
                            <img
                                className="rounded-full w-12 h-12 object-cover cursor-pointer hover:bg-gray-300 p-1"
                                src={user?.photoURL || alt}
                                alt="User profile"
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                            />
                            {profileDropdownOpen && (
                                <div className="absolute -right-2 mt-2 w-36 shadow-lg z-10 bg-base-200 rounded-lg">
                                    <div className="py-2 px-3 text-center">
                                        <p className="font-semibold text-sm cursor-not-allowed">
                                            {user?.displayName || "User"}
                                        </p>
                                    </div>
                                    <ul className="dropdown-menu text-center">
                                        <li>
                                            <button
                                                className="block w-full py-2 rounded-b-lg hover:text-white hover:font-medium hover:bg-red-700"
                                                onClick={handleSignOut}
                                            >
                                                Log out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        // <Link
                        //     to="/login"
                        //         className="btn btn-sm bg-blue-900 hover:bg-blue-950 text-white hover:dark:text-white border-none"
                        // >
                        //     Sign In
                        // </Link>
                        <SocialLogin></SocialLogin>
                    )}
                </div>
                <div>
                    <DarkMode />
                </div>
            </div>
        </div>
    );
};

export default Navbar;

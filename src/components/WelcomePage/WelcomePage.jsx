import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useThemeContext } from "../../providers/ThemeProvider";

const WelcomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { theme } = useThemeContext();

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1500);
    }, []);

    return (
        <div
            className={`flex items-center justify-center h-screen ${theme === "dark"
                    ? "bg-gray-900 text-white"
                    : "bg-gradient-to-r from-gray-500 to-blue-600 text-white"
                }`}
        >
            <div className="px-3">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-xl"
                >
                    <h1 className="text-2xl md:text-4xl font-bold mb-4">Welcome to Task Manager</h1>
                    <p className="text-lg mb-6">Manage your tasks with ease.</p>
                </motion.div>
            </div>
        </div>
    );
};

export default WelcomePage;

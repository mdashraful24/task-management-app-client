import { FaSun, FaMoon } from "react-icons/fa";
import { useThemeContext } from "../../../providers/ThemeProvider";

export function DarkMode() {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <div>
            <button
                className="ml-2 p-2 rounded-full bg-base-300 dark:text-white transition-all"
                onClick={toggleTheme}
            >
                {theme === "dark" ? <FaSun size={22} /> : <FaMoon size={22} />}
            </button>
        </div>
    );
}

export default DarkMode;





{/* <div className="mt-4">
    <label className="flex items-center cursor-pointer">
        <span className="mr-2">Manual Dark Mode:</span>
        <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
            className="toggle-checkbox hidden"
        />
        <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner dark:bg-gray-600">
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${theme === "dark" ? "translate-x-5" : "translate-x-0"}`}></div>
        </div>
    </label>
</div> */}
const Footer = () => {
    return (
        <div className="p-4 bg-black flex flex-col justify-center gap-1">
            <h2 className='text-xl md:text-3xl font-extrabold text-center text-white'>ProTasker</h2>
            <p className="text-center text-gray-400">&copy; {new Date().getFullYear()} . All rights reserved.</p>
            <p className="text-center text-gray-400">Designed, Developed and Maintained by Ashraful Islam</p>
        </div>
    );
};

export default Footer;
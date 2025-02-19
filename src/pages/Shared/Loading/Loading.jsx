const Loading = () => {
    return (
        <div className="flex min-h-screen justify-center items-center">
            {/* <span className="loading loading-bars loading-lg"></span> */}
            <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
};

export default Loading;

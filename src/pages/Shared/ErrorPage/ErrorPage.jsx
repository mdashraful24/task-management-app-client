import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import gif from '../../../../src/assets/error.png'

const ErrorPage = () => {
    return (
        <div className="hero min-h-screen">
            {/* Helmet */}
            <Helmet>
                <title>Error Page | ProTasker</title>
            </Helmet>
            <div className="hero-content text-center">
                <div className="max-w-md space-y-5">
                    <img src={gif} alt="" />
                    <p className="text-lg">Sorry, we couldn't find this page. But don't worry, you can find many other things on our <Link to={"/"} className="underline text-blue-600 leading-8 font-bold">Homepage</Link>.</p>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
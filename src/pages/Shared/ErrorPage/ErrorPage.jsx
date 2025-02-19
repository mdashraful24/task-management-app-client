import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import gif from '../../../../src/assets/404.gif'

const ErrorPage = () => {
    return (
        <div className="hero min-h-screen">
            {/* Helmet */}
            <Helmet>
                <title>Error Page | </title>
            </Helmet>
            <div className="hero-content text-center">
                <div className="max-w-md space-y-5">
                    <img src={gif} alt="" />
                    {/* <h1 className="text-5xl text-purple-900 font-bold">404</h1> */}
                    <p className="text-lg">Sorry, we couldn't find this page. But don't worry, you can find many other things on our <Link to={"/"} className="underline text-[#9538E2] leading-8 hover:font-bold">Homepage</Link>.</p>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
import { Helmet } from "react-helmet-async";

const Home = () => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
    
    return (
        <div>
            <Helmet>
                <title>Home | </title>
            </Helmet>

            
        </div>
    );
};

export default Home;
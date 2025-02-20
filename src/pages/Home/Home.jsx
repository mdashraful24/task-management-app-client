import { Helmet } from "react-helmet-async";
import TaskBoard from "../../components/TaskBoard/TaskBoard";

const Home = () => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);

    return (
        <div>
            <Helmet>
                <title>Home | </title>
            </Helmet>

            <TaskBoard />
        </div>
    );
};

export default Home;
import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import PremiumBiodata from "../PremiumBiodata/PremiumBiodata";
import SuccessCounter from "../SuccessCounter/SuccessCounter";
import SuccessStories from "../SuccessStories/SuccessStories";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>LuxeMatches | Home</title>
            </Helmet>
            <Banner />
            <PremiumBiodata />
            <SuccessCounter />
            <SuccessStories />
        </div>
    );
};

export default Home;
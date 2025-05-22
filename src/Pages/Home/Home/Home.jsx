import { Helmet } from "react-helmet";
import Banner from "../Banner/Banner";
import PremiumBiodata from "../PremiumBiodata/PremiumBiodata";
import SuccessCounter from "../SuccessCounter/SuccessCounter";
import SuccessStories from "../SuccessStories/SuccessStories";
import HowItWorks from "../HowItWorks/HowItWorks";
import MembershipPlans from "../MembershipPlans/MembershipPlans";
import BlogAdviceSection from "../BlogAdviceSection/BlogAdviceSection";
import NewsletterSignup from "../NewsletterSignup/NewsletterSignup";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>LuxeMatches | Home</title>
            </Helmet>
            <Banner />
            <PremiumBiodata />
            <SuccessStories />
            <HowItWorks />
            <MembershipPlans />
            <BlogAdviceSection />
            <NewsletterSignup />
            <SuccessCounter />
        </div>
    );
};

export default Home;
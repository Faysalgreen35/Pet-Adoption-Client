import { Helmet } from "react-helmet-async";
import Banner from "../../Shared/Banner/Banner";
import AboutUs from "../AboutUs/AboutUs";
import CallToAction from "../CallToAction/CallToAction";
import Category from "../Category/Category";
import GetInvolved from "../GetInvolved/GetInvolved";
import HappyTails from "../HappyTails/HappyTails";

 

const Home = () => {
    return (
        <div className=" dark:bg-gray-800  dark:text-white ">
             <Helmet>
                <title>Pet Adoption | Home</title>

            </Helmet>
           
            <Banner></Banner>
           <div className="m-20 ">
            <h2 className="flex justify-center text-5xl m-12">
                All Category 
            </h2>
            <Category></Category>
           </div>
            <CallToAction></CallToAction>

            <AboutUs></AboutUs>

            <HappyTails></HappyTails>

            <GetInvolved></GetInvolved>
        </div>
    );
};

export default Home;
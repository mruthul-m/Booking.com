import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.css";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperty from "../../components/featuredProperty/FeaturedProperty";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property title</h1>
        <PropertyList />
        <h1 className="homeTitle">Home Guest love</h1>
        <FeaturedProperty />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;

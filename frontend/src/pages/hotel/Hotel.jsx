import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import "./hotel.css";
import {
  faArrowLeftLong,
  faMapLocationDot,
  faArrowRightLong,
  faCircleXmark,
  faDrumSteelpan,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { da } from "date-fns/locale";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../contexts/SearchContext";
import { AuthContext } from "../../contexts/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(
    `http://localhost:5444/api/hotels/find/${id}`
  );

  const [itemIndex, setItemIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenodel] = useState(false);

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/495322427.jpg?k=d40731fbe0cb69c54e1370e5fdca32aed866dba8be6c9bc00794865dfe05c758&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/495322574.jpg?k=2642dd1f13cc1118ac2d37964b5f12e6feb691fcd364b1368419a27e01407c4f&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/495322584.jpg?k=e140d07ad1615b8b95b70ae2232f3f3ba3a9511dd1270ba8d9a044b13827620a&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/495322578.jpg?k=5693e63aa650127295cda1923b2fbd4c0d8ec82254f00f14981abb60d6f0e0f1&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/495322521.jpg?k=e6a0f59cefcba711ed83ea7a9490630a2cb6de0d7d960fc9c00a2122660d35ef&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/495322465.jpg?k=531dd8865990f80cabbab95b8581ac475acf945c1df9a3a9ae63d840479ef74b&o=&hp=1",
    },
  ];

  const { dates } = useContext(SearchContext);
  let countDate = 1;
  if (dates[0]) {
    const startDay = dates[0].startDate.getDate();
    const endDay = dates[0].endDate.getDate();
    countDate = endDay - startDay + 1 || 1;
  }

  const handleClick = (i) => {
    setItemIndex(i);
    setOpen(true);
  };
  const navigate = useNavigate();
  const handleBooking = () => {
    if (user) {
      setOpenodel(true);
    } else {
      navigate("/login");
    }
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = itemIndex === 0 ? 5 : itemIndex - 1;
    } else {
      newSlideNumber = itemIndex === 5 ? 0 : itemIndex + 1;
    }

    setItemIndex(newSlideNumber);
  };

  return (
    <>
      <Navbar />
      <Header type="list" />

      <div className="hotel-container">
        {open && (
          <div className="slider">
            <div className="wrapper">
              <FontAwesomeIcon
                icon={faCircleXmark}
                onClick={() => {
                  setOpen(false);
                }}
                className="close-btn"
              />
              <FontAwesomeIcon
                icon={faArrowLeftLong}
                className="left-arrow"
                onClick={() => handleMove("l")}
              />
              <div className="slider-wrapper">
                <img src={photos[itemIndex].src} className="slider-Img" />
              </div>
              <FontAwesomeIcon
                icon={faArrowRightLong}
                className="right-arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          </div>
        )}
        {loading ? (
          "Loading"
        ) : (
          <div className="hotel-wrapper">
            <button onClick={handleBooking} className="bookNow">
              Reserve or Book Now!
            </button>
            <h1 className="hotelTitle">{data.title}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faMapLocationDot} />
              <span>
                {data.city}, {data.address}
              </span>
            </div>
            <span className="hotelDistance">
              Excellent location - {data.distance}m from center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over {data.cheapestPrice} ₹at this property and get a
              free airport taxi
            </span>
            <div className="hotelImages">
              {photos.map((photos, i) => (
                <div
                  className="searchImageWrapper"
                  onClick={() => handleClick(i)}
                >
                  <img src={photos.src} className="hotelImg" />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">{data.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {countDate}-night stay!</h1>
                <span>
                  Located in the real heart of {data.city}, this property has an
                  excellent location score of {data.rarting || "Good"}
                </span>
                <h2>
                  <b>{data.cheapestPrice * countDate} ₹</b> ({countDate} nights)
                </h2>
                <button onClick={handleBooking}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <MailList className="mailList" />
      <Footer />
      {openModel && <Reserve setOpen={setOpenodel} hotelId={id} />}
    </>
  );
};

export default Hotel;

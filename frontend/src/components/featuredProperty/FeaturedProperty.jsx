import useFetch from "../../hooks/useFetch";
import "./featuredProperty.css";

const FeaturedProperty = () => {
  const images = [
    "https://www.gonvillehotel.co.uk/wp-content/uploads/2018/07/featured-hero-rosa.jpg",
    "https://cdn-cms4.hotelrunner.com/assets/photos/large/1624e776-ef8f-4389-be7e-782d30b2ec80.jpg",
  ];
  const { data, loading, error } = useFetch(
    "http://localhost:5444/api/hotels/featured?featured=true&min=300&max=800&limit=4"
  );

  return (
    <div className="fp">
      {loading ? (
        "loading"
      ) : (
        <>
          {data.map((item, i) => (
            <div className="fpItem" key={i}>
              <img src={images[0]} alt="" className="fpImg" />
              <span className="fpName">{data[i].name}</span>
              <span className="fpCity">{data[i].city}</span>
              <span className="fpPrice">{data[i].cheapestPrice}₹</span>
              <div className="fpRating">
                <button>8.9</button>
                <span>Excellent</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperty;

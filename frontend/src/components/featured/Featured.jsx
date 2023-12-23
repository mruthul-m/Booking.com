import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:5444/api/hotels/countByCity?cities=Kannur,Thalassery,Kuthuparamba"
  );

  const images = [
    "https://cf.bstatic.com/xdata/images/city/600x600/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o=",
    "https://cf.bstatic.com/xdata/images/city/600x600/684730.jpg?k=e37b93d88c1fe12e827f10c9d6909a1def7349be2c68df5de885deaa4bc01ee3&o=",
    "https://cf2.bstatic.com/xdata/images/city/600x600/684653.jpg?k=306ccafcc8a4a7e23b9e8a05b183453fe885b312a4daa5ce76ec39a1b79cbc6f&o=",
  ];

  if (data[1]) {
    return (
      <div className="featured">
        {data[1].map((item, i) => (
          <div className="featuredItem" key={i}>
            <img src={images[i]} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>{data[1][i]}</h1>
              <h2>{data[0][i]} properties</h2>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <h1>Loading ...</h1>
      </div>
    );
  }
};

export default Featured;

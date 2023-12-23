import React from "react";
import "./searchItem.css";
import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <div className="sItem">
      <img src={item.photos[0]} className="sImg" />
      <div className="sDetails">
        <h3 className="sDheading1">{item.title}</h3>
        <p className="sDheading2">{item.distance}m from center</p>
        <p className="sDheading3">free airport taxi</p>
        <p className="sDheading4">{item.desc}</p>
        <p className="sDheading5">free cancellation</p>
        <p className="sDheading6">
          You can cancel later, so lock in this great price today!
        </p>
      </div>
      <div className="sRating">
        <div className="topSection">
          {item.rating && (
            <>
              <p className="sRheading1">Excellent</p>
              <span className="rating">{item.rating}</span>
            </>
          )}
        </div>

        <div className="bottomSection">
          <span className="price">{item.cheapestPrice} ₹</span>
          <span className="taxInfo">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="btn">See availabilty</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserve.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../contexts/SearchContext.jsx";
import Axios from "axios";

const Reserve = ({ setOpen, hotelId }) => {
  const handleClick = () => {
    setOpen(false);
  };
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(
    `http://localhost:5444/api/hotels/rooms/${hotelId}`
  );

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  // console.log(selectedRooms);

  const { dates } = useContext(SearchContext);
  const getDatesRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };
  const datesRange = getDatesRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      datesRange.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleReserveClick = () => {};

  return (
    <div>
      <div className="reserveContainer">
        <div className="container">
          <FontAwesomeIcon
            onClick={handleClick}
            icon={faCircleXmark}
            className="close"
          />
          <div className="wrapper">
            <h1>Details:</h1>
            {data.map((room, i) => (
              <div className="details" key={i}>
                <h4 className="reservationContent">
                  {i + 1}.{room.title}
                </h4>
                <h5 className="reservationContent">Room Number:</h5>
                <ol className="reservationContent">
                  {room.roomnumbers.map((num, i) => (
                    <li key={i}>
                      {num.number}
                      <input
                        type="checkbox"
                        value={num._id}
                        onChange={(e) => handleSelect(e)}
                        disabled={!isAvailable(num)}
                      />
                    </li>
                  ))}
                </ol>

                <p className="reservationContent">{room.desc}</p>
                <p className="reservationContent">
                  Max People:<b> {room.maxpeople}</b>
                </p>
              </div>
            ))}
            <button className="reserveButton">Reserve Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reserve;

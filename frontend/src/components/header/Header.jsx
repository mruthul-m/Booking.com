import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import {
  faBed,
  faCalendarDays,
  faCar,
  faChild,
  faL,
  faPlane,
  faSmileWink,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns"; // used to format the date which is in js
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../contexts/SearchContext";
import { AuthContext } from "../../contexts/AuthContext";

const Header = ({ type }) => {
  const { user } = useContext(AuthContext);
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleClick = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const naviate = useNavigate();

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    naviate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type != "list" && (
          <>
            <h1 className="headerTitle">A lifetime of Discount? Its Genius.</h1>
            <p className="headerDesc">
              Get rewarded for your travels - unlock instant savings of 10% or
              more with a free mruthusbooking account
            </p>
            {!user && (
              <button className="headerButton">Sign in / Register</button>
            )}

            <div iv className="headerSearch">
              <div className="headerSearchItem icons">
                <FontAwesomeIcon icon={faBed} />
                <input
                  type="text"
                  placeholder="where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => {
                    setDestination(e.target.value);
                  }}
                />
              </div>
              <div className="headerSearchItem icons">
                <FontAwesomeIcon icon={faCalendarDays} />
                <span
                  onClick={() => {
                    setOpenDate(!openDate);
                    setOpenOptions(false);
                  }}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                  />
                )}
              </div>
              <div className="headerSearchItem icons">
                <FontAwesomeIcon icon={faChild} />
                <span
                  className="headerSearchText"
                  onClick={() => {
                    setOpenOptions(!openOptions);
                    setOpenDate(false);
                  }}
                >{`${options.adult} adult , ${options.children} children , ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="counter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterBtn"
                          onClick={() => {
                            handleClick("adult", "d");
                          }}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{`${options["adult"]}`}</span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => {
                            handleClick("adult", "i");
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="counter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterBtn"
                          onClick={() => {
                            handleClick("children", "d");
                          }}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">{`${options["children"]}`}</span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => {
                            handleClick("children", "i");
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="counter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterBtn"
                          onClick={() => {
                            handleClick("room", "d");
                          }}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options["room"]}
                        </span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => {
                            handleClick("room", "i");
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                className=" searchBtn"
                onClick={() => {
                  setOpenOptions(false);
                  setOpenDate(false);
                  handleSearch();
                }}
              >
                Search
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./list.css";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();

  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:5444/api/hotels?cities=${destination}&min=${
      min || 0
    }&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="lsItem dateSetup">
              <label>Check- in -date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "dd/MM/yyyy"
              )} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                  className="dateInlist"
                />
              )}
            </div>
            <div className="lsItem">
              <label htmlFor="">Options</label>
              <div className="lsOptionList">
                <div className="lsOptionItem">
                  <span>
                    Min Price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsItemInput"
                    onChange={(e) => setMin(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span>
                    Max Price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    className="lsItemInput"
                    onChange={(e) => setMax(e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span>Adult</span>
                  <input
                    type="number"
                    min={1}
                    placeholder={options.adult}
                    className="lsItemInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span>Children</span>
                  <input
                    type="number"
                    min={0}
                    placeholder={options.children}
                    className="lsItemInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span>Room</span>
                  <input
                    type="number"
                    min={1}
                    placeholder={options.room}
                    className="lsItemInput"
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "Loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

import { useContext, useEffect } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={"/"} style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">MruthusBooking</span>
        </Link>

        <div className="navItems">
          {user ? (
            <>
              {user.name}
              <button className="navButton">Logout</button>
            </>
          ) : (
            <>
              <button className="navButton">Register</button>
              <Link to={"/login"}>
                <button className="navButton">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

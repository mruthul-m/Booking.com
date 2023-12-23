import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  // console.log(credentials);

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      // if (
      //   credentials.username === undefined ||
      //   credentials.password === undefined
      // ) {
      //   throw new Error("Oops you forget something!");
      // }
      const res = await axios.post(
        "http://localhost:5444/api/auth/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response.data,
      });
    }
  };

  return (
    <div className="loginContainer">
      <div className="lwrapper">
        <div className="topContainer">
          <h1 className="loginHeader">LOGIN</h1>
        </div>
        <div className="bottomContainer" onSubmit={handleClick}>
          <form action="">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              onChange={handleChange}
              autoFocus
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={handleChange}
              required
            />
            <button disabled={loading} type={"submit"} className="loginBtn">
              Login
            </button>
          </form>
        </div>

        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;

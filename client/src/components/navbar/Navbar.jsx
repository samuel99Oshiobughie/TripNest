import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const logout = async() => {
    const res = await axios.post("/auth/logout");
    dispatch({ type: "LOGOUT" });
    navigate("/")
  };


  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">TripNest</span>
        </Link>
        {user ? 
        (<div>
          <span>{user.username}</span>
          <button className="navButton1" style={{marginLeft: '30px'}} onClick={logout}>Logout</button>
        </div>): (
          <div className="navItems">
            <Link to="/register">
            <button className="navButton1">Register</button>
            </Link>
            <Link to="/login">
            <button className="navButton1">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

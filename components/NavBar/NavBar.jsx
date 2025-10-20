import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shops">Shops</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

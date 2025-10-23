import { Link, useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const linkToSignIn = () => {
    navigate("/login");
  };

  const linkToSignUp = () => {
    navigate("/register");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shops">Shops</Link>
        </li>
        {/* ST-Todo: We should display based on whether a user has a shop */}
        {/* ex. "Create Shop" if no shop exists. "My Shop" to manage an existing shop */}
        <li>
          <Link to="/shops/new">Create Shop</Link>
        </li>
        <li>
          <Link to="/dashboard/shop">Manage Shop</Link>
        </li>
        {user ? (
          <li>
            <button onClick={handleSignOut}>Sign out</button>
          </li>
        ) : (
          <>
            <li>
              <button onClick={linkToSignUp}>Register</button>
            </li>
            <li>
              <button onClick={linkToSignIn}>Sign in</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;

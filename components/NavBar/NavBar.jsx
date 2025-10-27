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
    <nav
      className="navbar is-white m-5"
      role="navigation"
      aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" aria-label="PocketShop Home">
            <img
              src="/images/PocketShop-Logo.png"
              alt="PocketShop Logo"
              style={{ height: "40px" }}
            />
          </Link>
        </div>
        <div className="navbar-menu is-active">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              {user ? "Dashboard" : "Home"}
            </Link>
            <Link to="/shops" className="navbar-item">
              Shops
            </Link>
            <Link to="/products" className="navbar-item">
              Products
            </Link>
            {user && (
              <>
                {user.has_shop ? (
                  <Link to="/dashboard/shop" className="navbar-item">
                    Manage Shop
                  </Link>
                ) : (
                  <Link to="/shops/new" className="navbar-item">
                    Create Shop
                  </Link>
                )}
                <Link to="/dashboard/orders" className="navbar-item">
                  My Orders
                </Link>
                <Link to="/cart" className="navbar-item">
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
              </>
            )}
          </div>

          <div className="navbar-end">
            {user ? (
              <div className="navbar-item">
                <div className="buttons">
                  <button onClick={handleSignOut} className="button is-black">
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="navbar-item">
                <div className="buttons">
                  <button
                    onClick={linkToSignUp}
                    className="button is-black is-outlined">
                    <strong>Register</strong>
                  </button>
                  <button
                    onClick={linkToSignIn}
                    className="button is-black is-outlined">
                    Sign in
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

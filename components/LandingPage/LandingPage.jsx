import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Dashboard from "../../components/Dashboard/Dashboard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  console.log("LANDING PAGE USER:", user);
  return (
    <main className="hero is-fullheight-with-navbar is-white has-background-white">
      <div className="has-text-centered">
        <div className="container">
          {user ? (
            <>
              <h1
                className="mt-6 title is-2"
                style={{ color: "#FE8548" }}>
                Welcome back, {user.username}.
              </h1>
              <Dashboard />
            </>
          ) : (
            <>
              <h1 className="title is-1 has-text-weight-bold mb-3">
                Welcome To PocketShop
              </h1>
              <p className="subtitle is-4 mb-5">
                A place for independent makers, designers and entrepreneurs
              </p>

              <figure
                className="image is-inline-block"
                style={{
                  maxWidth: "600px",
                  margin: "0 auto",
                }}>
                <img
                  src="/images/PocketShop.png"
                  alt="PocketShop logo"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </figure>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default LandingPage;

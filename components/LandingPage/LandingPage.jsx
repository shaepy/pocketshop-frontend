import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Dashboard from "../../components/Dashboard/Dashboard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  console.log("LANDING PAGE USER:", user);
  return (
    <main>
      {user ? (
        <>
          <h1>Welcome back, {user.username}.</h1>
          <Dashboard />
        </>
      ) : (
        <>
          <h1>Welcome To PocketShop</h1>
          <p>A place for independent makers, designers and entrepreneurs</p>
        </>
      )}
    </main>
  );
};

export default LandingPage;

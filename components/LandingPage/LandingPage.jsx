import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const LandingPage = () => {
  // We use the 'user' object in our user useContext.
  const { user } = useContext(UserContext);

  return (
    <main>
      {user ? (
        <>
          <h1>Welcome back, {user.user.username}.</h1>
          <p>Your pocketshop is ready.</p>
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

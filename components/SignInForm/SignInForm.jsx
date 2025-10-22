import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { signIn } from "../../services/authService";

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      console.log("signedInUser:", signedInUser);
      setUser(signedInUser);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const isFormInvalid = () => {
    return !(email && password);
  };

  return (
    <main>
      <section>
        <h1>Sign in</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button disabled={isFormInvalid()}>Sign in</button>
            <button onClick={() => navigate("/")}>Cancel</button>
          </div>
        </form>
        <p>
          Don't have an account? <Link to="/register">Sign up here.</Link>
        </p>
      </section>
    </main>
  );
};

export default SignInForm;

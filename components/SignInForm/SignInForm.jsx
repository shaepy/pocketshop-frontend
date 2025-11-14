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
      <section className="section " style={{ paddingTop: "2rem" }}>
        <div className="container ">
          <div className="columns is-centered">
            <div className="column is-12-tablet is-6-desktop is-5-widescreen ">
              <h1 className="title is-2 has-text-centered ">
                <span className="sign">Sign</span>{" "}
                <span className="in">in</span>
              </h1>

              {error && (
                <div
                  className="notification is-danger is-light"
                  role="alert"
                  aria-live="polite">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="box custom-signin">
                <div className="field">
                  <label className="label" htmlFor="email">
                    Email
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      value={email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      value={password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field is-grouped is-grouped-right">
                  <div className="control">
                    <button
                      type="button"
                      className="button is-light"
                      onClick={() => navigate("/")}>
                      Cancel
                    </button>
                  </div>
                  <div className="control">
                    <button
                      type="submit"
                      className="button is-black is-outlined"
                      disabled={isFormInvalid()}>
                      Sign in
                    </button>
                  </div>
                </div>

                <p className="has-text-centered mt-4">
                  Don't have an account?{" "}
                  <Link to="/register">Sign up here.</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignInForm;

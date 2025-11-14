import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { signUp } from "../../services/authService";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    firstName: "",
    lastName: "",
  });

  const {
    username,
    password,
    passwordConfirmation,
    email,
    firstName,
    lastName,
  } = formData;

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const isFormInvalid = () => {
    return !(
      username &&
      password &&
      email &&
      firstName &&
      lastName &&
      password === passwordConfirmation
    );
  };

  return (
    <main>
      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-12-tablet is-8-desktop is-6-widescreen">
              <h1 className="title is-2 has-text-centered">
                <span className="sign">Create yo</span>
                <span className="in">ur account</span>
              </h1>

              {error && (
                <div
                  className="notification is-danger is-light"
                  role="alert"
                  aria-live="polite">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="box custom-signup">
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
                  <label className="label" htmlFor="username">
                    Username
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      id="username"
                      name="username"
                      placeholder="yourusername"
                      autoComplete="username"
                      value={username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <label className="label" htmlFor="firstName">
                        First Name
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          id="firstName"
                          name="firstName"
                          autoComplete="given-name"
                          value={firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <label className="label" htmlFor="lastName">
                        Last Name
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          id="lastName"
                          name="lastName"
                          autoComplete="family-name"
                          value={lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="columns">
                  <div className="column">
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
                          autoComplete="new-password"
                          value={password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <label className="label" htmlFor="passwordConfirmation">
                        Confirm Password
                      </label>
                      <div className="control">
                        <input
                          className="input"
                          type="password"
                          id="passwordConfirmation"
                          name="passwordConfirmation"
                          placeholder="••••••••"
                          autoComplete="new-password"
                          value={passwordConfirmation}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
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
                      Sign up
                    </button>
                  </div>
                </div>

                <p className="has-text-centered mt-4">
                  Already have an account? <Link to="/login">Log in here.</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUpForm;

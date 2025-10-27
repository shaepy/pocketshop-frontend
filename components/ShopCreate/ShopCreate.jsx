import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import * as shopApi from "../../services/shopService";
import { getUser } from "../../services/userService";

// TODO-ST: This route should only show if the user does not already have a SHOP
const ShopCreate = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  const { name, bio } = formData;

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("submitting a new shop", formData);
      const newShop = await shopApi.createShop(formData);
      console.log("newShop:", newShop);

      console.log("pulling user again and setting it");
      setUser(await getUser(user.id));

      navigate("/shops");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-12-tablet is-6-desktop is-5-widescreen">
              <h1 className="title is-2 has-text-centered">Create a Shop</h1>
              {error && (
                <div
                  className="notification is-danger"
                  role="alert"
                  aria-live="polite">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="box">
                <div className="field">
                  <label className="label" htmlFor="name">
                    Shop Name
                  </label>
                  <input
                    className="input"
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field">
                  <label className="label" htmlFor="bio">
                    About Shop
                  </label>
                  <textarea
                    className="textarea"
                    id="bio"
                    name="bio"
                    value={bio}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="control">
                  <button className="button is-black is-outlined">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShopCreate;

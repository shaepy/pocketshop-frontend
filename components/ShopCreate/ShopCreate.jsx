import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import * as shopApi from "../../services/shopService";

// TODO-ST: This route should only show if the user does not already have a SHOP
const ShopCreate = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      console.log("submitting a new shop", formData);
      const newShop = await shopApi.createShop(formData);
      console.log("newShop:", newShop);
      navigate("/shops");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <main>
      <section>
        <h1>Create a Shop</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Shop Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="bio">About Shop</label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={bio}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ShopCreate;

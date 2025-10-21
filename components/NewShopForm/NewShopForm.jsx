import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";

const NewShopForm = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      console.log("submitting a new shop");
    } catch (err) {
      setMessage(err.message);
    }
  };
  return (
    <main>
      <section>
        <h1>Create a Shop</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input type="text" />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default NewShopForm;

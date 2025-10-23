import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import * as shopApi from "../../services/shopService";

// ST: IN PROGRESS (EDIT AND DELETE)
// ST: This route should only show if the user has a SHOP
const ShopManage = () => {
  const navigate = useNavigate();
  const [userShop, setUserShop] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchUserShop = async () => {
      const userShopFound = await shopApi.getUserShop();
      console.log("userShop found:", userShopFound);
      setUserShop(userShopFound);
      setFormData({
        name: userShopFound.name ?? "",
        bio: userShopFound.bio ?? "",
      });
    };
    fetchUserShop();
    console.log("isEditMode is currently:", isEditMode);
  }, [isEditMode]);

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  const linkToAddProduct = () => {
    navigate("/dashboard/shop/products/new");
  };

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("UPDATING THE SHOP NOW...");
      const updatedShop = await shopApi.updateShop(formData);
      console.log("updatedShop:", updatedShop);
      setIsEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle Edit Shop
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  // Delete Shop (FUTURE IMPROV: Validation before deletion (ASK YES OR NO to confirm))
  const handleDelete = () => {
    // IN PROGRESS
  };

  if (!userShop) return <p>Loading your shop...</p>;
  return (
    <main>
      <section>
        <h1>Manage Shop</h1>
        <div>
          <button onClick={toggleEditMode}>
            {isEditMode ? "Close Edit" : "Edit Shop"}
          </button>
          <button>Delete Shop</button>
        </div>
        {isEditMode ? (
          <div>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
              <label>Shop Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label>About Shop</label>
              <input
                type="text"
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
              />
              <button type="submit">Update</button>
            </form>
          </div>
        ) : (
          <div>
            <h2>{userShop.name}</h2>
            <h3>About Shop: {userShop.bio}</h3>
          </div>
        )}
      </section>

      <section>
        <p>{userShop.products.length} products found.</p>
        <button onClick={linkToAddProduct}>+ Add Product</button>
        {userShop.products.map((product) => (
          <div key={product.id}>
            <h4>
              {product.id}. {product.title}
            </h4>
            <p>description: {product.description}</p>
            <p>${product.price}</p>
            <p>qt: {product.quantity}</p>
            <p>category: {product.category}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default ShopManage;

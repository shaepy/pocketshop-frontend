import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";
import ProductForm from "../ProductForm/ProductForm";
import * as shopApi from "../../services/shopService";
import * as productApi from "../../services/productService";
import { getUser } from "../../services/userService";

const ShopManage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [userShop, setUserShop] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isProductMode, setIsProductMode] = useState(false);
  const [isEditProductMode, setIsEditProductMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    // ST - added isProductMode to refresh useEffect
  }, [isEditMode, isProductMode, isEditProductMode]);

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  // Toggle add product Shop
  const toggleAddProductMode = () => {
    setIsProductMode((prev) => !prev);
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
  const handleDeleteShop = async () => {
    const deletedShop = await shopApi.deleteShop();
    console.log("deletedShop:", deletedShop);

    console.log("pulling user again and setting it");
    setUser(await getUser(user.id));

    // temporarily moving them elsewhere
    navigate("/");
  };

  //Deleting Product
  const handleDeleteProduct = async (productId) => {
    try {
      await productApi.deleteProduct(productId);

      // Refetch the shop to update the products list
      const userShopFound = await shopApi.getUserShop();
      setUserShop(userShopFound);
    } catch (err) {
      setError(err.message || "Failed to delete product.");
    }
  };

  //edit product
  const toggleEditProductMode = (product = null) => {
    setSelectedProduct(product);
    setIsEditProductMode((prev) => !prev);
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
          <button onClick={handleDeleteShop}>Delete Shop</button>
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
        <button onClick={toggleAddProductMode}>
          {isProductMode ? "Close" : "+ Add Product"}
        </button>

        {isProductMode ? (
          <ProductForm product={null} setIsProductMode={setIsProductMode} />
        ) : isEditProductMode ? (
          <ProductForm
            product={selectedProduct}
            setIsEditProductMode={setIsEditProductMode}
          />
        ) : (
          userShop.products.map((product) => (
            <div key={product.id}>
              <h4>
                {product.id}. {product.title}
              </h4>
              <p>description: {product.description}</p>
              <p>${product.price}</p>
              <p>qt: {product.quantity}</p>
              <p>category: {product.category}</p>
              <button onClick={() => toggleEditProductMode(product)}>
                {isEditProductMode ? "Close" : "Edit"}
              </button>
              <button onClick={() => handleDeleteProduct(product.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default ShopManage;

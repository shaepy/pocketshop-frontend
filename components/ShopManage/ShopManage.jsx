import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
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
    };
    fetchUserShop();
    console.log("isEditMode is currently:", isEditMode);
  }, [isEditMode]);

  const linkToAddProduct = () => {
    navigate("/dashboard/shop/products/new");
  };

  if (!userShop) return <p>Loading your shop...</p>;

  // Edit Shop
  // TRUE (EDIT) or FALSE
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  // Delete Shop

  return (
    <main>
      <div>
        <h1>Manage Shop</h1>
        <div>
          <button onClick={toggleEditMode}>
            {isEditMode ? "Close Edit" : "Edit Shop"}
          </button>
          <button>Delete Shop</button>
        </div>
        <h2>{userShop.name}</h2>
        <div>
          <button onClick={linkToAddProduct}>+ Add Product</button>
        </div>
        <h3>About Shop: {userShop.bio}</h3>
      </div>

      <section>
        <p>{userShop.products.length} products found.</p>
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

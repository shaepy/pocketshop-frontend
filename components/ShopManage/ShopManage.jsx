import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import * as shopApi from "../../services/shopService";

// ST: This route should only show if the user has a SHOP
const ShopManage = () => {
  const navigate = useNavigate();
  const [userShop, setUserShop] = useState(null);

  useEffect(() => {
    const fetchUserShop = async () => {
      const userShopFound = await shopApi.getUserShop();
      console.log("userShop found:", userShopFound);
      setUserShop(userShopFound);
    };
    fetchUserShop();
  }, []);

  const linkToAddProduct = () => {
    navigate("/dashboard/shop/products/new");
  };

  if (!userShop) return <p>Loading your shop...</p>;

  // Edit Shop
  // Delete Shop

  return (
    <main>
      <div>
        <h1>Manage Shop</h1>
        <h2>{userShop.name}</h2>
        <div>
          <button onClick={linkToAddProduct}>+ Add Product</button>
        </div>
        <h3>About Shop: {userShop.bio}</h3>
      </div>

      <section>
        <p>{userShop.products.length} products found.</p>
        {userShop.products.map((product) => (
          <div>
            <h4 key={product.id}>
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

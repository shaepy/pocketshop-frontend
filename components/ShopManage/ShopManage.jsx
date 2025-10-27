import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, Link } from "react-router";
import { getUser } from "../../services/userService";
import ProductForm from "../ProductForm/ProductForm";
import * as shopApi from "../../services/shopService";
import * as productApi from "../../services/productService";

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

  // Toggle Edit Shop
  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const linkToProductOrders = (productId) => {
    navigate(`/dashboard/product/${productId}/orders`);
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
      <section className="section">
        <div className="container">
          <div className="columns is-centered mb-6">
            <div className="column is-one-fifth">
              <h1 className="title mt-4 is-3">Manage Shop</h1>
              <div>
                <button
                  className="button is-light mr-2 mb-2"
                  onClick={toggleEditMode}
                >
                  {isEditMode ? "Close Edit" : "Edit Shop"}
                </button>
                <button className="button is-light" onClick={handleDeleteShop}>
                  Delete Shop
                </button>
              </div>
            </div>
            {isEditMode ? (
              <div className="column">
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label" htmlFor="name">
                      Shop Name
                    </label>
                    <input
                      className="input"
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
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
                      value={formData.bio}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button className="button is-black is-outlined" type="submit">
                    Update
                  </button>
                </form>
              </div>
            ) : (
              <div className="mt-3 column">
                <h2 className="title is-2">{userShop.name}</h2>
                <h3>{userShop.bio}</h3>
              </div>
            )}
          </div>

          <section>
            <div className="mb-6">
              <h2 className="title is-3">Manage Products</h2>
              {isProductMode ? null : (
                <button
                  className="button is-black is-outlined mt-2"
                  onClick={toggleAddProductMode}
                >
                  {isProductMode ? null : "+ Add Product"}
                </button>
              )}
            </div>
            <div className="grid mr-4 ml-4 is-col-min-12 is-gap-5">
              {isProductMode ? (
                <ProductForm
                  product={null}
                  setIsProductMode={setIsProductMode}
                />
              ) : isEditProductMode ? (
                <ProductForm
                  product={selectedProduct}
                  setIsEditProductMode={setIsEditProductMode}
                />
              ) : (
                userShop.products.map((product) => (
                  <div
                    className="cell box hover-box mb-0 is-flex is-flex-direction-column is-justify-content-center is-align-items-center has-text-centered"
                    key={product.id}
                  >
                    <h4
                      className="title is-5"
                      aria-label={`${product.title} (ID: ${product.id})`}
                    >
                      {product.title}
                    </h4>
                    <button
                      className="button is-black is-outlined mb-3"
                      onClick={() => linkToProductOrders(product.id)}
                    >
                      View Orders
                    </button>
                    <div className="m-3">
                      <img
                        className="shop-page-image"
                        src={product.images[0].url}
                        alt={product.title}
                      />
                      <p>{product.description}</p>
                      <p>${product.price}</p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Category: {product.category}</p>
                    </div>
                    <div>
                      <button
                        className="button is-light mr-2"
                        onClick={() => toggleEditProductMode(product)}
                      >
                        {isEditProductMode && selectedProduct?.id === product.id
                          ? "Close"
                          : "Edit"}
                      </button>
                      <button
                        className="button is-light"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default ShopManage;

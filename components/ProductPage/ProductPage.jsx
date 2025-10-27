import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as productApi from "../../services/productService";
import * as cartApi from "../../services/cartService";

const ProductPage = () => {
  const initialState = {
    product: 0,
    quantity: 0,
  };
  const { user } = useContext(UserContext);
  const { productId } = useParams();
  // Had to update this to null state, array was throwing errors
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const foundProducts = await productApi.getProduct(productId);
      console.log("product Found by id ", foundProducts);
      console.log("product.images:", foundProducts.images);

      setProduct(foundProducts);
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <p>Loading product...</p>;

  const handleAddToCart = async () => {
    //Create form data
    formData.product = product.id;
    formData.quantity = quantity;
    try {
      //console.log("submitting a new cart item", formData);
      const newCartItem = await cartApi.addProductToCart(formData);
      console.log("newCartItem :", newCartItem);
      setMessage("Added to your cart.");
      setFormData(initialState);
      setQuantity(1);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main>
      <section className="section">
        <div className="container columns is-vcentered">
          <div className="column has-text-centered">
            <h1 className="title is-2">{product.title}</h1>
            {(product.images || []).map((image, idx) => (
              <div
                key={image.id || image.url || idx}
                style={{ marginBottom: "20px" }}>
                {/* show the images */}
                <div style={{ marginBottom: "10px" }}>
                  <img
                    className="product-page-large-image"
                    src={image.url}
                    alt={product.title}
                    style={{
                      width: "100%",
                      maxWidth: "500px",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "2px solid #ddd",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="column m-3">
            <h2 className="title is-2">${product.price * quantity}</h2>
            <p>
              <Link to={`/shops/${product.shop.id}`}>{product.shop.name}</Link>
            </p>
            <p className="mt-3 mb-5">{product.description}</p>

            {product.quantity > 0 ? (
              <p>✓ In Stock ({product.quantity} available)</p>
            ) : (
              <p>Out of Stock</p>
            )}

            <div className="mt-5 mb-5 is-flex is-flex-direction-row is-align-items-center is-gap-2">
              <p>Quantity</p>
              <button
                className="button is-light"
                //disable quantity button because we cannot send negative numbers
                disabled={quantity <= 0 ? true : false}
                onClick={() => setQuantity(quantity - 1)}>
                <i class="fa-solid fa-minus"></i>
              </button>
              <p> {quantity} </p>
              <button
                className="button is-light"
                // disable quantity button if more than product has
                disabled={quantity >= product.quantity ? true : false}
                onClick={() => setQuantity(quantity + 1)}>
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <p>{message}</p>
            <button
              className="button is-black is-outlined mt-2"
              //disable add to cart if quantity is 0
              disabled={quantity === 0 ? true : false}
              onClick={() => (user ? handleAddToCart() : navigate("/login"))}>
              <i class="fa-solid fa-cart-plus"></i>
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductPage;

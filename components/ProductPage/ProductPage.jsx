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
  const [product, setProduct] = useState([]);
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
      setMessage("Product added to cart");
      setFormData(initialState);
      setQuantity(1);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.category}</p>
      <p>{product.description}</p>

      {(product.images || []).map((image) => (
        <div style={{ marginBottom: "20px" }}>
          {/* show the images */}
          <div style={{ marginBottom: "10px" }}>
            <img
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

      <p>${product.price * quantity}</p>
      {product.quantity > 0 ? (
        <p>✓ In Stock ({product.quantity} available)</p>
      ) : (
        <p>Out of Stock</p>
      )}
      <button
        //disable quantity button because we cannot send negative numbers
        disabled={quantity <= 0 ? true : false}
        onClick={() => setQuantity(quantity - 1)}
      >
        -
      </button>
      <p>Quantity {quantity} </p>
      <button
        // disable quantity button if more than product has
        disabled={quantity >= product.quantity ? true : false}
        onClick={() => setQuantity(quantity + 1)}
      >
        +
      </button>
      <p>{message}</p>
      <button
        //disable add to cart if quantity is 0
        disabled={quantity === 0 ? true : false}
        onClick={() => (user ? handleAddToCart() : navigate("/register"))}
      >
        Add to Cart
      </button>
    </>
  );
};

export default ProductPage;

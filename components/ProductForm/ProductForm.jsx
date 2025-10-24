import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as productApi from "../../services/productService";

const ProductForm = ({ product, setIsProductMode, setIsEditProductMode }) => {
  const navigate = useNavigate();
  const initialState = {
    productImage: product?.productImage || "",
    title: product?.title || "",
    description: product?.description || "",
    price: product?.price || 0,
    quantity: product?.quantity || 0,
    category: product?.category || "None",
  };

  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (product) {
        console.log("Updating product");
        const updatingProduct = await productApi.updateProduct(
          product.id,
          formData
        );
        console.log("updated product", updatingProduct);
        setFormData(initialState);
        if (setIsEditProductMode) setIsEditProductMode(false);
      } else {
        console.log("Adding a product");
        const newProduct = await productApi.addProduct(formData);
        console.log("new product", newProduct);
        setFormData(initialState);
        if (setIsProductMode) setIsProductMode(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div>
        {error && <p>{error}</p>}
        <h1>{setIsProductMode ? "Create New Product" : "Edit Product" }</h1>
        {setIsEditProductMode && <button onClick={()=>setIsEditProductMode(false)}> Close </button>}  
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="productImage">Product Images</label>
            <input
              type="text"
              id="productImage"
              name="productImage"
              value={formData.productImage}
              onChange={handleChange}
            />
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <label htmlFor="description">description</label>
            <input
              type="description"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <label htmlFor="quantity">quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="0"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
            <label htmlFor="category">category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="None">-- Select an option --</option>
              <option value="PETS">Pet Supplies</option>
              <option value="ART">Art & Crafts</option>
              <option value="VINT">Vintage</option>
              <option value="FASH">Fashion</option>
              <option value="HOME">Home & Living</option>
              <option value="BEAU">Beauty & Personal Care</option>
              <option value="ELEC">Electronics & Gadgets</option>
              <option value="DIGI">Digital Goods</option>
              <option value="SPRT">Sports & Outdoors</option>
              <option value="CUST">Custom Orders</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductForm;

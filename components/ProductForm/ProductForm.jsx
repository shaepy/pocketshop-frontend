import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as productApi from "../../services/productService";
import * as cloudinaryApi from "../../services/cloudinaryService";
const ProductForm = ({ product, setIsProductMode, setIsEditProductMode }) => {
  const navigate = useNavigate();
  const initialState = {
    // Need a useEffect to setImageFiles
    productImage: product?.productImage || [],
    title: product?.title || "",
    description: product?.description || "",
    price: product?.price || 0,
    quantity: product?.quantity || 0,
    category: product?.category || "None",
  };
  console.log("product in ProductForm:", product);
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  // Set these to productImage
  const [imageFiles, setImageFiles] = useState([]); //stores the actual File objects selected by user
  const [imagePreviews, setImagePreviews] = useState([]); //stores preview URLs to show before upload
  const [uploading, setUploading] = useState(false); //shows loading state during Cloudinary upload

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      setImageFiles(files);

      // Create preview URLs for each file
      const previews = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result);
          // Only update state when all previews are ready
          if (previews.length === files.length) {
            setImagePreviews(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setUploading(true);

      let images = product?.images || [];

      // Upload all selected images
      if (imageFiles.length > 0) {
        const uploadPromises = imageFiles.map((file) =>
          cloudinaryApi.uploadImageToCloudinary(file)
        );
        images = await Promise.all(uploadPromises); //Uses Promise.all() to upload all images in parallel

        // Set the first image as primary
        if (images.length > 0) {
          images[0].is_primary = true;
        }
      }

      // Build the product data in the format backend expects
      const productData = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        quantity: formData.quantity,
        category: formData.category,
        images: images,
      };

      if (product) {
        console.log("Updating product with data:", productData);
        const updatingProduct = await productApi.updateProduct(
          product.id,
          productData
        );

        console.log("updated product", updatingProduct);
        setFormData(initialState);
        setImageFiles([]); //Clears image state after submission
        setImagePreviews([]);
        if (setIsEditProductMode) setIsEditProductMode(false);
      } else {
        console.log("Adding a product with data:", productData);
        const newProduct = await productApi.addProduct(productData);

        console.log("new product", newProduct);
        setFormData(initialState);
        setImageFiles([]); //Clears image state after submission
        setImagePreviews([]);
        if (setIsProductMode) setIsProductMode(false);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="product-form-div container is-max-tablet">
      <div className="mb-5">
        {error && (
          <div
            className="notification is-danger"
            role="alert"
            aria-live="polite">
            {error}
          </div>
        )}
        <h1 className="title is-3">
          {product ? "Edit Product" : "Add New Product"}
        </h1>
        {(setIsEditProductMode || setIsProductMode) && (
          <button
            className="button is-light"
            onClick={() => {
              if (setIsEditProductMode) setIsEditProductMode(false);
              else if (setIsProductMode) setIsProductMode(false);
            }}>
            Close
          </button>
        )}
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} className="box">
          <div className="file">
            <label className="file-label" htmlFor="productImage">
              <input
                className="file-input"
                type="file"
                id="productImage"
                name="productImage"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Upload an image...</span>
              </span>
            </label>
          </div>
          {imagePreviews.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "10px",
              }}>
              {imagePreviews.map((preview, index) => (
                <div key={index}>
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      border:
                        index === 0 ? "3px solid green" : "1px solid gray",
                    }}
                  />
                  {index === 0 && (
                    <p style={{ fontSize: "12px", margin: 0 }}>Primary</p>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="field">
            <label className="label" htmlFor="title">
              Title
            </label>
            <input
              className="input"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label className="label" htmlFor="description">
              Description
            </label>
            <textarea
              className="textarea"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="columns">
            <div className="column">
              <label className="label" htmlFor="price">
                Price
              </label>
              <input
                className="input"
                type="number"
                id="price"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="column">
              <label className="label" htmlFor="quantity">
                quantity
              </label>
              <input
                className="input"
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="column">
              <label className="label" htmlFor="category">
                Category
              </label>
              <div className="select">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required>
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
              </div>
            </div>
          </div>
          <button
            className="button is-black is-outlined"
            type="submit"
            disabled={uploading}>
            {uploading ? "Uploading images..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as productApi from "../../services/productService";
import * as cloudinaryApi from "../../services/cloudinaryService";
const ProductForm = ({ product, setIsProductMode, setIsEditProductMode }) => {
  const navigate = useNavigate();
  const initialState = {
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
  const [existingImages, setExistingImages] = useState(product?.images || []);
  const [imageFiles, setImageFiles] = useState([]); //stores the actual File objects selected by user
  const [imagePreviews, setImagePreviews] = useState([]); //stores preview URLs to show before upload
  const [uploading, setUploading] = useState(false); //shows loading state during Cloudinary upload

  useEffect(() => {
    setFormData({
      title: product?.title || "",
      description: product?.description || "",
      price: product?.price || 0,
      quantity: product?.quantity || 0,
      category: product?.category || "None",
    });
    setExistingImages(product?.images || []);
  }, [product]);

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    // Append to any already selected files
    if (files.length > 0) {
      setImageFiles((prev) => [...prev, ...files]);

      // Build previews for newly selected files and append
      const readers = files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          })
      );

      Promise.all(readers).then((newPreviews) => {
        setImagePreviews((prev) => [...prev, ...newPreviews]);
      });
    }
  };

  // Remove a NEW (not yet uploaded) image by preview index
  const handleRemoveNewPreview = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // EXISTING (already saved) — remove by public_id
  const handleRemoveExisting = (publicId) => {
    setExistingImages((imgs) =>
      imgs.filter((img) => img.public_id !== publicId)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);

      // Start with images the user kept
      let finalImages = [...existingImages];

      // Upload any new files and append to finalImages
      if (imageFiles.length > 0) {
        const uploaded = await Promise.all(
          imageFiles.map((file) => cloudinaryApi.uploadImageToCloudinary(file))
        );

        console.log("uploaded", uploaded);
        // Keep only the fields your backend needs (map secure_url -> url)
        const cleanedUploaded = uploaded.map((img) => ({
          url: img.secure_url || img.url || "",
          public_id: img.public_id,
        }));

        const cleanedExisting = finalImages.map(
          ({ url, secure_url, public_id }) => ({
            url: url || secure_url || "",
            public_id,
          })
        );

        finalImages = [...cleanedExisting, ...cleanedUploaded];
      } else {
        // Clean existing if they have extra fields
        finalImages = finalImages.map(({ url, secure_url, public_id }) => ({
          url: url || secure_url || "",
          public_id,
        }));
      }

      console.log("final images", finalImages);

      // Build the product data in the format backend expects
      const productData = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        quantity: formData.quantity,
        category: formData.category,
        images: finalImages,
      };

      if (product) {
        console.log("Updating product with data:", productData);
        const updatingProduct = await productApi.updateProduct(
          product.id,
          productData
        );

        console.log("updated product", updatingProduct);

        setImageFiles([]); //Clears image state after submission
        setImagePreviews([]);
        if (setIsEditProductMode) setIsEditProductMode(false);
      } else {
        console.log("Adding a product with data:", productData);
        const newProduct = await productApi.addProduct(productData);

        console.log("new product", newProduct);
        setFormData(initialState);
        setExistingImages([]);
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
            aria-live="polite"
          >
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
            }}
          >
            Close
          </button>
        )}
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} className="box">
          {/* EXISTING images (editable: remove) */}
          {existingImages.length > 0 && (
            <>
              <p className="label">Current images</p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                {existingImages.map((img) => (
                  <div key={img.public_id} style={{ textAlign: "center" }}>
                    <img
                      src={img.url}
                      alt="Product"
                      style={{
                        width: "110px",
                        height: "110px",
                        objectFit: "cover",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                      }}
                    />
                    <div
                      className="buttons is-centered"
                      style={{ marginTop: 6 }}
                    >
                      <button
                        type="button"
                        className="button is-small is-danger is-light"
                        onClick={() => handleRemoveExisting(img.public_id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* NEW image picker */}
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
                <span className="file-label">Add images…</span>
              </span>
            </label>
          </div>

          {/* NEW image previews (removable) */}
          {imagePreviews.length > 0 && (
            <>
              <p className="label" style={{ marginTop: 12 }}>
                New images (to be uploaded)
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                {imagePreviews.map((preview, index) => (
                  <div key={index} style={{ textAlign: "center" }}>
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: "110px",
                        height: "110px",
                        objectFit: "cover",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                      }}
                    />
                    <div
                      className="buttons is-centered"
                      style={{ marginTop: 6 }}
                    >
                      <button
                        type="button"
                        className="button is-small is-danger is-light"
                        onClick={() => handleRemoveNewPreview(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
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
              </div>
            </div>
          </div>
          <button
            className="button is-black is-outlined"
            type="submit"
            disabled={uploading}
          >
            {uploading ? "Uploading images..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;

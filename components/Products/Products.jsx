import { useState, useEffect } from "react";
import { Link } from "react-router";
import * as productApi from "../../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const foundProducts = await productApi.getProducts();
      console.log("products Found", foundProducts);
      setProducts(foundProducts);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>All products</h1>
      <ul>
        {products.length >= 0 ? (
          products.map((product) => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>{product.title}</Link>
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>
    </>
  );
};


export default Products;
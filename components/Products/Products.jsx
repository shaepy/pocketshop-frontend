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
    <main>
      <section className="section">
        <div className="container">
          <div className="has-text-centered">
            <h1 className="title is-2">All Products</h1>
            <div className="grid is-col-min-10 is-gap-3">
              {products.length > 0 ? (
                products.map((product) => (
                  <Link key={product.id} to={`/products/${product.id}`}>
                    <div className="box cell hover-box">
                      <h2 className="title is-5">{product.title}</h2>
                      <p>by {product.shop.name}</p>
                      <img
                        className="all-products-page-img"
                        src={product.images[0].url}
                      />
                    </div>
                  </Link>
                ))
              ) : (
                <p>No products available.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Products;

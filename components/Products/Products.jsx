import { useState, useEffect } from "react";
import { Link } from "react-router";
import * as productApi from "../../services/productService";
import "./Products.css";

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
            <h1 className="title is-2 mb-6">All Products</h1>
            <div className="grid is-col-min-10 is-gap-5">
              {products && products.length >= 0 ? (
                products.map((product) => (
                  <Link key={product.id} to={`/products/${product.id}`}>
                    <div className="box cell hover-box all-products-page-box">
                      <img
                        className="all-products-page-img mb-3"
                        src={
                          product.images?.[0]?.url
                            ? product.images[0].url
                            : "/images/no-image.jpg"
                        }
                      />
                      <p className="has-text-weight-semibold is-size-5">
                        ${product.price}
                      </p>
                      <p className="mt-2">{product.title}</p>
                      <p className="tiny-text">by {product.shop.name}</p>
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

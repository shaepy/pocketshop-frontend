import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import * as shopApi from "../../services/shopService";
import "./ShopPage.css";

const ShopPage = () => {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const fetchShop = async () => {
      const foundShop = await shopApi.getShop(shopId);
      setShop(foundShop);
    };
    fetchShop();
  }, [shopId]);

  if (!shop) return <p>Loading shop...</p>;

  return (
    <main>
      <section className="section">
        <div className="container">
          <h1 className="title is-2 has-text-centered">{shop.name}</h1>
          <div className="columns is-8">
            <div className="column is-one-quarter mt-6">
              <div>
                <h2 className="title is-3">About</h2>
                <p>{shop.bio}</p>
              </div>
              <div className="mt-5">
                <h3 className="title is-4 mb-2">Contact Seller</h3>
                <p>{shop.owner.username}</p>
              </div>
            </div>
            <div className="column is-12-tablet is-10-desktop is-7-widescreen mt-6">
              <h2 className="title is-3">Products</h2>
              <div className="grid is-col-min-10 is-gap-3">
                {shop.products.length > 0 ? (
                  shop.products.map((product) => (
                    // This should link to the product page
                    <Link to={`/products/${product.id}`} key={product.id}>
                      <div className="box has-text-centered hover-box cell shop-page-product-div is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
                        <h3 className="title is-4 mb-3">{product.title}</h3>
                        <p className="mb-3 is-size-5">${product.price}</p>
                        <img
                          src={product.images[0].url}
                          className="shop-page-image"
                        />
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>No products yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShopPage;

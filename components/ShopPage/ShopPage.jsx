import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import * as shopApi from "../../services/shopService";

const ShopPage = () => {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const fetchShop = async () => {
      const foundShop = await shopApi.getShop(shopId);
      console.log("shop found:", foundShop);
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
            <div className="column is-one-quarter">
              <div>
                <h2 className="title is-3">About</h2>
                <p>{shop.bio}</p>
              </div>
              <div>
                <h3 className="title is-4">Owner</h3>
                <p>{shop.owner.username}</p>
              </div>
            </div>
            <div className="column is-12-tablet is-10-desktop is-7-widescreen">
              <h2 className="title is-3">Products</h2>
              <div className="grid is-col-min-10 is-gap-3">
                {/* <p>{shop.products.length} products found.</p> */}
                {shop.products.map((product) => (
                  // This should link to the product page
                  <Link to={`/products/${product.id}`} key={product.id}>
                    <div className="box hover-box cell shop-page-product-div is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
                      <h3 className="title is-4 mb-2">{product.title}</h3>
                      <p>${product.price}</p>
                      <img
                        src={product.images[0].url}
                        className="shop-page-image"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShopPage;

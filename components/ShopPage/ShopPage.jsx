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
      <div>
        <h1>{shop.name}</h1>
        <p>{shop.bio}</p>
        <p>Owner: {shop.owner.username}</p>
        <p>Image: {shop.shop_image}</p>
      </div>
      <section>
        <div>
          <h2>Products</h2>
          <p>{shop.products.length} products found.</p>
          {shop.products.map((product) => (
            // This should link to the product page
            <h3 key={product.id}>
              <Link to={`/products/${product.id}`}>{product.title}</Link>
            </h3>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ShopPage;

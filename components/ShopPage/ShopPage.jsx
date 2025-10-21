import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import * as shopApi from "../../services/shopService";

const ShopPage = () => {
  const { shopId } = useParams();
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const fetchShop = async () => {
      const foundShop = await shopApi.show(shopId);
      console.log("shop found:", foundShop);
      setShop(foundShop);
    };
    fetchShop();
  }, [shopId]);

  if (!shop) return <p>Loading shop...</p>;

  return (
    <main>
      <h1>{shop.name}</h1>
      <p>{shop.bio}</p>
      <p>Owner: {shop.owner.username}</p>
      <p>Image: {shop.shop_image}</p>
    </main>
  );
};

export default ShopPage;

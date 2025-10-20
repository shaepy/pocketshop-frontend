import { useEffect, useState } from "react";
import * as shopApi from "../../services/shopService";

function Shops() {
  const [shops, setShops] = useState([]);
  useEffect(() => {
    const fetchShops = async () => {
      const shops = await shopApi.index();
      console.log("shops", shops);
      setShops(shops);
    };
    fetchShops();
  }, []);

  return (
    <>
      <h1>All Shops</h1>
      <ul>
        {shops.map((shop) => (
          <li key={shop.id}>{shop.name}</li>
        ))}
      </ul>
    </>
  );
}

export default Shops;

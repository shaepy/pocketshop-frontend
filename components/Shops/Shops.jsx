import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import * as shopApi from "../../services/shopService";

const Shops = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      const foundShops = await shopApi.index();
      console.log("shops", foundShops);
      setShops(foundShops);
    };
    fetchShops();
  }, []);

  return (
    <>
      <h1>All Shops</h1>
      {shops.length} Found.
      <ul>
        {shops.map((shop) => (
          <li key={shop.id}>
            <Link to={`/shops/${shop.id}`}>{shop.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Shops;

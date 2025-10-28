import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import * as shopApi from "../../services/shopService";

const Shops = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      const foundShops = await shopApi.getShops();
      console.log("shops", foundShops);
      setShops(foundShops);
    };
    fetchShops();
  }, []);

  return (
    <main>
      <section className="section">
        <div className="container is-max-tablet">
          <div className="has-text-centered">
            <h1 className="title is-2">All Shops</h1>
          </div>

          <div className="m-3">
            {shops.length > 0 ? (
              shops.map((shop) => (
                <Link to={`/shops/${shop.id}`} key={shop.id}>
                  <div className="mt-6 has-text-centered all-shops-shop-div box hover-box m-5 is-flex is-flex-direction-column is-align-items-center">
                    <h2 className="title is-5 mb-3">{shop.name}</h2>
                    <p>{shop.bio}</p>
                  </div>
                </Link>
              ))
            ) : (
              <div
                className="is-flex is-justify-content-center is-align-items-center has-text-centered"
              >
                <p className="subtitle is-6">
                  No shops available.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shops;

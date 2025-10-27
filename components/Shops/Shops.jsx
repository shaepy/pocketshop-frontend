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
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-12-tablet is-6-desktop is-5-widescreen">
              <div className="has-text-centered">
                <h1 className="title is-2">All Shops</h1>
              </div>
              <section className="m-3">
                {shops.length > 0 ? (
                  shops.map((shop) => (
                    <Link to={`/shops/${shop.id}`} key={shop.id}>
                      <div className="box hover-box mt-5 is-flex is-flex-direction-column is-align-items-center">
                        <h2 className="title is-5">{shop.name}</h2>
                        <p>{shop.bio}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p>No shops available.</p>
                )}
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shops;

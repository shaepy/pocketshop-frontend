import * as orderApi from "../../services/orderService";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";

const Dashboard = () => {
  // useEffect for getOrdersByProduct
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const foundOrders = await orderApi.getOrdersByProduct();
      console.log("orders for products for this user's shop:", foundOrders);
      setOrders(foundOrders);
    };
    fetchOrders();
  }, []);

  const linkToShopManage = () => {
    navigate("/dashboard/shop");
  };

  // We can filter orders that have pending statuses only later
  return (
    <main>
      <section className="section">
        <div className="columns is-6">
          <div className="orders-for-shop column box mr-5 mb-0">
            <h2 className="is-size-4">{user?.has_shop ? "Active Shop Orders" : "Shop Not Created"}</h2>
            {user?.has_shop ? (
              <button
                onClick={linkToShopManage}
                className="button is-black is-outlined mt-4 mb-4"
              >
                Go to Manage Shop
              </button>
            ) : (
              <button
                onClick={() => navigate("/shops/new")}
                className="button is-black mt-4 mb-4"
              >
                Create a new shop
              </button>
            )}
            {Array.isArray(orders) && orders.length > 0 && (
              orders.map((order) => (
                <p key={order.product.id}>
                  <Link to={`dashboard/product/${order.product.id}/orders`}>
                    {order.product.title}
                  </Link>{" "}
                  ({order.orders.length})
                </p>
              ))
            )}
          </div>
          <div className="orders-for-buyer column box">
            <h2 className="title is-4">My Orders</h2>
            <p>Placeholder for active orders made by this user</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;

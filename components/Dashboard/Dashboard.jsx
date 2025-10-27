import * as orderApi from "../../services/orderService";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

const Dashboard = () => {
  // useEffect for getOrdersByProduct
  const navigate = useNavigate();
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
            <h2 className="title is-4">Active Shop Orders</h2>
            <button
              onClick={linkToShopManage}
              className="button is-black is-outlined mb-5">
              Go to Manage Shop
            </button>
            {orders ? (
              orders.map((order) => (
                <p key={order.product.id}>
                  {" "}
                  <Link
                    className="blue-link "
                    to={`dashboard/product/${order.product.id}/orders`}>
                    {" "}
                    {order.product.title}
                  </Link>{" "}
                  ({order.orders.length})
                </p>
              ))
            ) : (
              <p>No active orders for your shop's products.</p>
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

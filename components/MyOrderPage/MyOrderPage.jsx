import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as orderApi from "../../services/orderService";

const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const foundOrders = await orderApi.getUserOrders();
      console.log("orders for this buyer:", foundOrders);
      setOrders(foundOrders);
    };
    fetchOrders();
  }, []);

  if (!orders)
    return (
      <main>
        <h1>My Orders</h1>
        <p>No orders found yet.</p>
      </main>
    );

  return (
    <main>
      <header>
        <h1>My Orders</h1>
      </header>
      <section>
        {orders.map((order) => (
          <div key={order.id}>
            <h2>Order #{order.id}</h2>
            <p>Date: {order.created_at}</p>
            <p>
              <Link to={`/products/${order.product.id}`}>
                {order.product.title}
              </Link>
            </p>
            <p>Quantity: {order.quantity}</p>
            <p>Total: ${order.subtotal}</p>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default MyOrderPage;

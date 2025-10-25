import { useState, useEffect } from "react";
import { Link } from "react-router";
import { parseISO, format } from "date-fns";
import * as orderApi from "../../services/orderService";

const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const foundOrders = await orderApi.getUserOrders();
      console.log("orders for this buyer:", foundOrders);
      setOrders(foundOrders);
    };
    fetchOrders();
    setStatusUpdate(false);
  }, [statusUpdate]);

  const handleUpdateOrder = async (orderId, subtotal, quantity, cancelFlag) => {
    try {
      const status = cancelFlag ? "Cancelled" : "Delivered";

      const orderData = {
        subtotal: subtotal,
        quantity: quantity,
        status: status,
      };
      const updatedOrder = await orderApi.updateOrder(orderId, orderData);
      console.log("updatedOrder is:", updatedOrder);
      setStatusUpdate(true);
    } catch (error) {
      console.log("Error:", error);
    }
  };

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
            <h2>
              <Link to={`/products/${order.product.id}`}>
                {order.product.title}
              </Link>
            </h2>
            <p>
              From{" "}
              <Link to={`/shops/${order.product.shop.id}`}>
                {order.product.shop.name}
              </Link>
            </p>
            <p>
              {" "}
              Date:{" "}
              {order.created_at
                ? format(parseISO(order.created_at), "MMM d, yyyy h:mm a")
                : "—"}
            </p>
            <p>Quantity: {order.quantity}</p>
            <p>Total: ${order.subtotal}</p>
            <p>Status: {order.status}</p>
            <div>
              <button
                disabled={
                  order.status === "Delivered" ||
                  order.status === "Pending" ||
                  order.status === "Cancelled"
                }
                onClick={() =>
                  handleUpdateOrder(
                    order.id,
                    order.subtotal,
                    order.quantity,
                    false
                  )
                }>
                Mark as Delivered
              </button>
              <button
                disabled={
                  order.status === "Delivered" ||
                  order.status === "Cancelled" ||
                  order.status === "Shipped"
                }
                onClick={() =>
                  handleUpdateOrder(
                    order.id,
                    order.subtotal,
                    order.quantity,
                    true
                  )
                }>
                Cancel Order
              </button>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default MyOrderPage;

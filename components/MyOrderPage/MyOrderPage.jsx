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
      await orderApi.updateOrder(orderId, orderData);
      setStatusUpdate(true);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  if (!orders)
    return (
      <main>
        <section className="section">
          <div className="container">
            <h1 className="title is-2">My Orders</h1>
            <p>
              Your order history is empty. Treat yourself to something{" "}
              <Link className="blue-link" to={"/products"}>
                new
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    );

  return (
    <main>
      <section className="section">
        <div className="container is-max-desktop">
          <h1 className="title is-2 mb-6">My Orders</h1>

          <section>
            {orders.map((order) => (
              <div key={order.id} className="box hover-box mb-6">
                <div className="columns order-details-div">
                  <p className="column tiny-text">
                    ORDER PLACED{" "}
                    {order.created_at
                      ? format(parseISO(order.created_at), "MMM d, yyyy")
                      : "—"}
                  </p>
                  <p className="column tiny-text">TOTAL ${order.subtotal}</p>
                  <p className="column tiny-text">ORDER #{order.id}</p>
                </div>

                <div className="columns is-vcentered mt-2">
                  <div className="column is-one-fifth">
                    <img
                      className="order-page-image"
                      src={order.product.images[0].url}
                    />
                  </div>
                  <div className="column">
                    <h2 className="is-size-4 mt-4 mb-1">
                      <Link
                        className="blue-link"
                        style={{ fontWeight: 500 }}
                        to={`/products/${order.product.id}`}>
                        {order.product.title}
                      </Link>{" "}
                    </h2>
                    <p>Quantity x {order.quantity}</p>
                    <p className="mb-4">
                      From{" "}
                      <Link
                        className="blue-link"
                        to={`/shops/${order.product.shop.id}`}>
                        {order.product.shop.name}
                      </Link>
                    </p>
                  </div>
                  <div className="column">
                    <div className="is-flex is-flex-direction-row is-align-items-center">
                      <p className="mr-3">Status</p>
                      <span className="order-status-label">
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-1">
                  <button
                    className="button is-black is-outlined mr-3"
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
                    className="button is-light"
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
        </div>
      </section>
    </main>
  );
};

export default MyOrderPage;

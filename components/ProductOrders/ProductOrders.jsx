import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import * as productApi from "../../services/productService";
import * as orderApi from "../../services/orderService";
import { parseISO, format } from "date-fns";

const ProductOrders = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const foundProductOrders = await productApi.getProductOrders(productId);
      console.log("product and orders found by id ", foundProductOrders);
      setProduct(foundProductOrders);
    };
    fetchProduct();
    setStatusUpdate(false);
  }, [productId, statusUpdate]);

  const handleUpdateOrder = async (orderId, subtotal, quantity) => {
    try {
      const orderData = {
        subtotal: subtotal,
        quantity: quantity,
        status: "Shipped",
      };
      const updatedOrder = await orderApi.updateOrder(orderId, orderData);
      console.log("updatedOrder is:", updatedOrder);
      setStatusUpdate(true);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  if (!product) return <p>Loading product...</p>;

  return (
    <main>
      <section className="section">
        <div className="container is-max-desktop">
          <p className="mb-6">
            <Link to={"/dashboard/shop"}>
              <i className="fa-solid fa-arrow-left"></i> Back to Manage Shop
            </Link>
          </p>
          <h1 className="title is-2 mb-5">Orders for {product.title}</h1>

          {product.orders.length > 0 ? (
            <section>
              {product.orders.map((order) => (
                <div key={order.id} className="box hover-box">
                  <div className="columns order-details-div">
                    {/* THE HEADER */}
                    <p className="column tiny-text">
                      ORDER PLACED{" "}
                      {order.created_at
                        ? format(parseISO(order.created_at), "MMM d, yyyy")
                        : "—"}
                    </p>
                    <p className="column tiny-text">TOTAL ${order.subtotal}</p>
                    <p className="column tiny-text">ORDER #{order.id}</p>
                  </div>

                  <div className="columns">
                    <div className="column">

                      <div className="columns is-vcentered">
                        <div className="column is-one-quarter">
                          <img className="order-page-image" src={order.product.images[0].url} />
                        </div>
                        <div className="column">
                          <h2 className="is-size-4 mt-4 mb-1">
                            <Link to={`/products/${order.product.id}`}>
                              {order.product.title}
                            </Link>
                          </h2>
                          <p>Quantity: {order.quantity}</p>
                        </div>
                      </div>

                      <div className="is-flex is-flex-direction-row mb-5 mt-5 is-align-items-center">
                        <p className="mr-3">Status</p>
                        <span className="order-status-label">
                          {order.status.toUpperCase()}
                        </span>
                      </div>
                      <button
                        className="button is-black is-outlined"
                        disabled={
                          order.status === "Shipped" ||
                          order.status === "Delivered" ||
                          order.status === "Cancelled"
                        }
                        onClick={() =>
                          handleUpdateOrder(
                            order.id,
                            order.subtotal,
                            order.quantity
                          )
                        }>
                        Mark as Shipped
                      </button>
                    </div>
                    {/* BUYER INFO */}
                    <div className="column mt-5 is-one-third">
                      <h2 className="is-size-5 mb-3">
                        <strong>Contact Buyer</strong>
                      </h2>
                      <p>
                        <i className="fa-solid fa-user"></i>
                        <span className="ml-2">
                          {order.buyer.first_name} {order.buyer.last_name}
                        </span>
                      </p>
                      <p>
                        <i className="fa-solid fa-envelope"></i>
                        <span className="ml-2">{order.buyer.email}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <p>No orders for this product yet.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default ProductOrders;

import { Link } from "react-router";

const CartItems = ({ item, handleDeleteItem, handleQuantity }) => {
  return (
    <div key={item.id} className="box is-max-tablet cart-item">
      <h3 className="is-size-5">
        <Link to={`/products/${item.product.id}`}>{item.product.title}</Link>
      </h3>
      <img src={item.product.images[0].url} className="cart-item-image mt-3 mb-3" />
      <p>Price: ${item.product.price}</p>

      <div className="is-flex is-flex-direction-row is-align-items-center is-gap-2 mt-3 mb-3">
        <p>Quantity</p>
        <button
          className="button is-light"
          onClick={() => handleQuantity(false, item.quantity, item.id)}>
          <i class="fa-solid fa-minus"></i>
        </button>
        {item.quantity}
        <button
          className="button is-light"
          disabled={item.quantity >= item.product.quantity}
          onClick={() => handleQuantity(true, item.quantity, item.id)}>
          <i class="fa-solid fa-plus"></i>
        </button>
        <button
          className="button is-light"
          onClick={() => handleDeleteItem(item.id)}>
          <i className="fa-solid fa-trash"></i>
          Remove
        </button>
      </div>

      <div className="has-text-right">
        <p className="is-size-4">
          Subtotal: <strong>${item.product.price * item.quantity}</strong>
        </p>
        <p>{item.product.quantity - item.quantity} remaining in stock</p>
      </div>
    </div>
  );
};

export default CartItems;

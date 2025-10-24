import { Link } from "react-router";

const CartItems = ({ item, handleDeleteItem, handleQuantity }) => {
  return (
    <>
      <li key={item.id}>
        Title :{" "}
        <Link to={`/products/${item.product.id}`}>{item.product.title}</Link> /
        Quantity :
        <button onClick={() => handleQuantity(true, item.quantity, item.id)}>
          +
        </button>
        {item.quantity}
        <button onClick={() => handleQuantity(false, item.quantity, item.id)}>
          -
        </button>
        / Price per item: {item.product.price} / Total :
        {item.product.price * item.quantity}
        <button onClick={() => handleDeleteItem(item.id)}>Delete Item</button>
      </li>
    </>
  );
};

export default CartItems;

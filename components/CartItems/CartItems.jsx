import { Link } from "react-router";

const CartItems = ({ item, handleDeleteItem, handleQuantity }) => {
  return (
    <>
      <li key={item.id}>
        Title :{" "}
        <Link to={`/products/${item.product.id}`}>{item.product.title}</Link> /
        {/*showing stock avaliable*/}
        <p>{item.product.quantity - item.quantity} remaining in stock</p>
        Quantity :
        <button
          disabled={item.quantity >= item.product.quantity}
          onClick={() => handleQuantity(true, item.quantity, item.id)}
        >
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

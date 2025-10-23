import { useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import keysToSnakeTopLevel from "../../utilities/convertToSnake";
import * as cartApi from "../../services/cartService";
import CartItems from "../CartItems/CartItems";

const Carts = () => {
  const initialStateDelete = {
    cartItemId: 0,
  };
  const initialStateUpdate = {
    cartItemId: 0,
    quantity: 0,
  };
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [deleteRequest, setDeleteRequest] = useState(initialStateDelete);
  const [updateRequest, setUpdateRequest] = useState(initialStateUpdate);

  useEffect(() => {
    const fetchCart = async () => {
      const foundCart = await cartApi.getCart();
      //   console.log("found cart ", foundCart);
      //console.log("found cart items", foundCart.cart_items);
      setCart(foundCart);
      setCartItems(foundCart.cart_items);
    };

    fetchCart();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      deleteRequest.cartItemId = itemId;
      //console.log("request:", request);
      const snakeRequest = keysToSnakeTopLevel(deleteRequest);
      //console.log("snake_case request:", snakeRequest);
      const new_cart = await cartApi.deleteItemFromCart(snakeRequest);
      console.log(new_cart);
      setCart(new_cart);
      setCartItems(new_cart.cart_items);
      setDeleteRequest(initialStateDelete);
    } catch (error) {
      console.log("Error", error);
    }
  };

   const handleQuantity = async (flag, itemQuantity, itemId) => {
    try {
      console.log("item quantity before:", itemQuantity);
      const newQuantity = flag? itemQuantity + 1 : itemQuantity - 1;
      console.log("item after:", newQuantity);

      updateRequest.cartItemId = itemId;
      updateRequest.quantity = newQuantity;
      const snakeRequest = keysToSnakeTopLevel(updateRequest);
      console.log("request:", snakeRequest);

      //I don't need snake case here as one word
      const new_cart = await cartApi.patchQuantityInCart(snakeRequest);
      console.log(new_cart);

      setCart(new_cart);
      setCartItems(new_cart.cart_items);
      setUpdateRequest(initialStateUpdate);
    } catch (error) {
      console.log("Error", error);
    }
  };

  

  return (
    <>
      <h1> Cart</h1>
      <ul>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItems item ={item} handleDeleteItem={handleDeleteItem} handleQuantity={handleQuantity}/>
          ))
        ) : (
          <h2>No Items in Cart</h2>
        )}
        <p>Total Cost Of Cart : {cart.total_cost}</p>
      </ul>

      {/* This should take you to payment page */}
      <button disabled={cartItems.length <= 0 && true}>Checkout</button>
    </>
  );
};

export default Carts;

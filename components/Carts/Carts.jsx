import { useState, useEffect, useContext, act } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import keysToSnakeTopLevel from "../../utilities/convertToSnake";
import * as cartApi from "../../services/cartService";
import * as orderApi from "../../services/orderService";
import * as productApi from "../../services/productService";
import CartItems from "../CartItems/CartItems";
import PaymentScreen from "../PaymentScreen/PaymentScreen";

const Carts = () => {
  const navigate = useNavigate();
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
  const [activePaymentScreen, setActivePaymentScreen] = useState(false);
  const [deleteRequest, setDeleteRequest] = useState(initialStateDelete);
  const [updateRequest, setUpdateRequest] = useState(initialStateUpdate);

  useEffect(() => {
    const fetchCart = async () => {
      const foundCart = await cartApi.getCart();
      console.log("found cart ", foundCart);
      console.log("found cart items", foundCart.cart_items);
      setCart(foundCart);
      setCartItems(foundCart.cart_items);
    };

    fetchCart();
    console.log("activePaymentScreen is currently:", activePaymentScreen);
  }, [activePaymentScreen]);

  const toggleActivePaymentScreen = () => {
    setActivePaymentScreen((prev) => !prev);
  };

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
      const newQuantity = flag ? itemQuantity + 1 : itemQuantity - 1;
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

  // TODO-ST : Pass this function to PaymentScreen
  const handleCreateOrders = async (paymentId) => {
    try {
      // FUNCTION TO CREATE ORDER (For each cart_item, create 1 order)
      console.log(
        `handleCreateOrders: CREATING ORDER for paymentId: ${paymentId}`
      );

      //We need to use promsie otherwsie we will have a race condition
      await Promise.all(
        cartItems.map(async (cartItem) => {
          //Checking if the quantity in cart item is enough in product quantity
          if (cartItem.quantity <= cartItem.product.quantity) {
            //if there is enough quantity you create the order
            const orderData = {
              payment: paymentId,
              product: cartItem.product.id,
              status: "Pending",
              quantity: cartItem.quantity,
              subtotal: cartItem.quantity * cartItem.product.price,
            };
            const order = await orderApi.createOrder(orderData);
            console.log("order created:", order);

            //Remove quantity from product
            const newQuantityData = {
              quantity: cartItem.product.quantity - cartItem.quantity,
            };
            await productApi.setNewQuantity(
              cartItem.product.id,
              newQuantityData
            );
          }
        })
      );

      //clear cart items after all orders are created - returns cleared cart
      await clearCart();
    } catch (error) {
      console.log("Error", error);
    }
  };

  const clearCart = async () => {
    try {
      //clear cart items - returns cleared cart
      const clearedCart = await cartApi.clearCart();
      setCart(clearedCart);
      setCartItems(clearedCart.cart_items);
    } catch (error) {
      console.log("Error clearing cart", error);
    }
  };

  if (!cart) return <p>Loading your cart...</p>;

  return (
    <>
      <h1> Cart</h1>
      <ul>
        <button
          disabled={cartItems.length <= 0 && true}
          onClick={() => clearCart()}
        >
          Clear cart
        </button>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItems
              key={item.id}
              item={item}
              handleDeleteItem={handleDeleteItem}
              handleQuantity={handleQuantity}
            />
          ))
        ) : (
          <h2>No Items in Cart</h2>
        )}
        <p>Total Cost Of Cart : {cart.total_cost}</p>
      </ul>

      {/* This should take you to payment page */}
      <button
        disabled={cartItems.length <= 0 && true}
        onClick={toggleActivePaymentScreen}
      >
        {activePaymentScreen ? "Cancel" : "Proceed to checkout"}
      </button>

      {activePaymentScreen && (
        <PaymentScreen
          setActivePaymentScreen={setActivePaymentScreen}
          handleCreateOrders={handleCreateOrders}
        />
      )}
    </>
  );
};

export default Carts;

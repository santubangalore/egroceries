import { CartItem, useShoppingCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function ShopCart() {
  const navigate = useNavigate();

  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useShoppingCart();
  console.log(cartItems);

  function gotoCheckOut(): void {
    navigate("/checkout");
  }

  return (
    <>
      <div className="flex-col flex items-center bg-white gap-8 p-10 text-black text-sm">
        <h1 className="text-2xl font-bold">Your cart</h1>
        <div className="flex flex-col gap-4">
          {cartItems.map((item: CartItem) => (
            <div
              className="flex justify-between items-center"
              key={item.productId}
            >
              <div className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.description}
                  className="rounded-md h-24 w-24 object-cover border-[1px] border-gray-700"
                />
                <div className="flex flex-col ">
                  <h1 className="text-lg font-bold">{item.description}</h1>
                  <p className="text-gray-600">{item.price}</p>
                </div>
              </div>
              <div className="flex gap-4 border-[1px] border-gray-700">
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    addToCart(item);
                  }}
                >
                  +
                </button>
                <p>{item.quantity}</p>
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                  onClick={() => {
                    removeFromCart(item);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length > 0 ? (
          <div className="flex flex-col justify-between items-center">
            <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
            <button
              className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              onClick={() => {
                clearCart();
              }}
            >
              Clear cart
            </button>
          </div>
        ) : (
          <h1 className="text-lg font-bold">Your cart is empty</h1>
        )}
        <div className="flex flex-col gap-4 items-center bg-white">
          {cartItems.length > 0 && (
            <Button
              buttonText="Proceed to checkout"
              handleClick={gotoCheckOut}
              fontSize={0}
              isdisabled={getCartTotal() === 0}
            />
          )}
        </div>
      </div>
    </>
  );
}

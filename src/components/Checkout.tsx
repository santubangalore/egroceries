import { useContext, useEffect, useState } from "react";
import ShoppingCartContext, { CartItem } from "../context/CartContext";
import Button from "./Button";
import { Link } from "react-router-dom";
import "./ShowLoyalty.css";
import { User } from "../lib/Users";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user, cartItems, getCartTotal, addToCart,calcDiscountExceptLoyaltyItem } = useContext(ShoppingCartContext);
  const [address, setAddress] = useState("");
  const addreLbl="Please enter delivery address";
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isloyaltyMember,setIsLoyaltyMember]= useState(false);
  const navigate = useNavigate();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    console.log('togglePopup:',isPopupOpen);
  };
  const AddLoyaltyRecord=(usr: User)=> {
    const cartItem: CartItem = { productId: 20004, 
      image: '/images/loyalty_card.png',
      quantity: 1,
      description: "Loyalty membership",
      price: 15,
      discounted_price: 15,
      purchasedate: new Date()
     };
      addToCart(cartItem);
      console.log('togglePopup:',isPopupOpen);
      togglePopup();
      setIsLoyaltyMember(true);
      user.isLoyaltyMember = true;
      
  }
  useEffect(() => {
    const loalty = user.isLoyaltyMember? true:  false;
    if (loalty) {
      setIsLoyaltyMember(true);
    }
  },[])
  const proceedToCheckoutConfirm=()=>{
    navigate('/checkoutconfirm');
  }
  return (
    <div className="flex-row flex  mt-6 text-black text-sm  height: 100svh">
      <div className="flex-col flex   text-black text-sm mr-5">
        <h2 className="text-2xl font-bold text-center">Checkout Page</h2>
        <div className="flex flex-col mt-4 ">
          <label className="text-gray-800 font-semibold mb-4">
            {user.Name !== undefined || user.Name === ""
              ? addreLbl
              : "Please Login to continue"}
          </label>
          {user.Name === undefined || user.Name === "" ? (
            <Link to="/login">
              <Button
                buttonText="Login"
                fontSize={20}
                handleClick={() => {}}
                isdisabled={false}
              />
            </Link>
          ) : (
            <div>
              <h1 className="text-lg font-bold">{addreLbl}</h1>
              <textarea
                placeholder="your address"
                rows={4}
                cols={60}
                value={address}
                className="border-[2px] border-gray-300 rounded-md px-4 py-2 w-full"
                onChange={(e) => setAddress(e.target.value)}
                disabled={user === undefined ? true : false}
              />
            </div>
          )}
        </div>
        <div className="flex-col flex items-center bg-white gap-8 pl-5 pt-5 text-black text-sm w-[600px] mt-4 h-[100%vh">
          <h1 className="text-2xl font-bold">Your cart</h1>
          <div className="flex flex-col gap-4 ">
            {cartItems.map((item: CartItem) => (
              <div
                className="flex justify-between items-center"
                key={item.productId}
              >
                <div className="flex gap-2">
                  <img
                    src={item.image}
                    alt={item.description}
                    className="rounded-md h-12 w-12 object-cover border-[1px] border-gray-700"
                  />
                  <div className="flex flex-col ">
                    <h1 className="text-lg font-bold">
                      {item.description.substring(0, 60)}
                    </h1>
                    <p className="text-gray-600">{item.price}</p>
                  </div>
                </div>
                <div className="flex gap-4 border-[1px] border-gray-700"></div>
              </div>
            ))}
          </div>
          {cartItems.length > 0 ? (
            <div className="flex flex-col justify-between items-center">
              <h1 className="text-lg font-bold">
                Total: ${getCartTotal()}
              </h1>
            </div>
          ) : (
            <h1 className="text-lg font-bold">Your cart is empty</h1>
          )}
          <div className="flex flex-col gap-4 items-center bg-white">
            {cartItems.length > 0 && (
              <Button
                buttonText="Checkout"
                handleClick={() => proceedToCheckoutConfirm()}
                fontSize={0}
                isdisabled={address.trim() === ""}
              />
            )}
          </div>
        </div>
      </div>
      <div className=" flex items-center bg-yellow-100 gap-8 p-4 text-black text-sm rounded-md">
        <div>
          <button
            onClick={togglePopup}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isPopupOpen ? "Close Popup" : "Buy Loyalty Membership"}
          </button>
          {isPopupOpen && (
            <div className="popup">
              <div className="popup-content">
                <span
                  className="close-button"
                  onClick={() => setIsPopupOpen(false)}
                >
                  &times;
                </span>
                <div className="flex flex-col items-center gap-4 h-[380px] w-[300px]">
                  <h3 className="flex font-semibold text-xl font-serif  text-gray-800">
                    Buy Loyalty Membership
                  </h3>
                  <p>Buy loyalty to get 20% discount on all products</p>
                  <p>Amount: $15</p>
                  <Button
                    buttonText="Buy Loyalty membership"
                    fontSize={20}
                    handleClick={() => {
                      AddLoyaltyRecord(user);
                    }}
                    isdisabled={isloyaltyMember ? true : false}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Checkout;

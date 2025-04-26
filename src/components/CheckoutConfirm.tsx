
import { useEffect, useState } from "react"
import { User } from "../lib/Users"
import Button from "./Button"
import { CartItem, useShoppingCart } from "../context/CartContext"
import { clear } from "console"


type UserCart = { 
  user: User,
  cartItems: CartItem[]
} 


const CheckoutConfirm = () => {
  const   PUBLIC_URL  = process.env.REACT_APP_PUBLIC_URL;
  const [showPopup, setShowPopup] = useState(false);
  const [isPurchased,setIsPurchased] = useState(true);
  const {cartItems} = useShoppingCart();
  const filteredCartITems = cartItems.filter((item:CartItem)=>item.description!=='Loyalty membership');
  const {calcDiscountExceptLoyaltyItem, clearCart, user,getCartTotal} = useShoppingCart();
 
  useEffect(() => {
    if (isPurchased) {
      handleSubmit();
    }
  }, []);
  
  


  const handleSubmit = async () => {
    const userCart: UserCart = {
      user: user,
      cartItems: cartItems,
    }
    console.log('userCart:',userCart);
    console.log('body:',JSON.stringify(userCart));
    
    try {
      const response = await fetch(`${PUBLIC_URL}/orders/create` , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCart),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

       await response.json().then((data) => {
      
      });
    

    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  return (
    <div className="flex flex-col items-center gap-4 h-[100vh] w-[100%] ">
        <div className="flex-col flex items-center bg-white gap-8 p-10 text-black text-sm w-[85%]">
        <h3 className="flex font-semibold text-xl font-serif  text-gray-800">Checkout Confirmed</h3>
        <div className="flex flex-col gap-4">
          {filteredCartITems.map((item: CartItem) => (
            <div
              className="flex justify-between items-center"
              key={item.productId}
            >
              <div className="flex gap-2">
                <div className="flex flex-row ">
                  <h1 className="text-lg font-bold">{item.description} - Qty:{item.quantity}</h1>
                  <p></p>
                </div>
              </div>
         
            </div>
          ))}
        </div>
        <p className="font-bold text-lg"> Total amount:{user.isLoyaltyMember ?calcDiscountExceptLoyaltyItem(): getCartTotal ()}</p>
      </div>
       
    
    </div>
  )
}
export default CheckoutConfirm
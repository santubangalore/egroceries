
import  Button  from "./Button";
import { useState, useContext } from "react";
import  ShoppingCartContext  from "../context/CartContext";
import { CartItem } from "../context/CartContext";
import { User } from "../lib/Users";

type NumItems={
  count: number;
}

type productProps = {
        id: number;
        name: string;
        price: number;
        image: string;
    };
    
    const ProductDetail = ({id,name, price, image}: productProps) => {
      const [qty,setqty]= useState(0);
      const [count, setCount] = useState(0);
      const { addToCart,
        removeFromCart,
        clearCart,
        getCartTotal, getCartItems,cartItemCount} = useContext(ShoppingCartContext);
        const {userName} = useContext(ShoppingCartContext); 
      const clickHandler = async (id:number,name:string,price:number,quantity:number) => {
        
        const cartItem: CartItem = { productId: id, 
         image: image,
         quantity: quantity,
         description: name,
         price: price,
         discounted_price: price,
         purchasedate: new Date()
        };
         addToCart(cartItem);
      }
      
        return (
          <div className="flex-col w-[500px] height-[350px] border-[1px] border-radius-[3px] mb-8 border-gray-700 bg-white">
            <div className="flex flex-col gap-2 items-center">
              <img
                src={image}
                alt=""
                height={128}
                width={128}
                background-color="blue"
              />
              <h2>{name}</h2>
            </div>
            <div className="flex justify-center">
              <p className="font-bold text-gray-800"> Price: $ {price}</p>
            </div>
            <div className=" flex justify-center w-[400px] h-[42px] align-middle mb-[5px]">
              <div className="flex flex-row w-[80px]">
              <button onClick={() => setqty(qty -1)} disabled={qty <= 0} className="bg-gray-200 rounded-lg w-[25px]">-</button>
              <input readOnly value={qty} className="w-[15px] text-center"></input>
              <button onClick={() => setqty(qty +1)} className="bg-gray-200 rounded-lg w-[25px]">+</button>
             
              </div>              
              <Button
                buttonText="Add to Cart"
                fontSize={16}
                pillShape={true}
                handleClick={() =>clickHandler(id, name, price,qty)}
                isdisabled={qty === 0} 
              />
            </div>
          </div>
        );
    };
    
    
    export default ProductDetail;

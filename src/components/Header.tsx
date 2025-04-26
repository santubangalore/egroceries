import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import Login from "./Login"
import React, { useContext, useEffect, useState } from "react";
import ShoppingCartContext, { useShoppingCart } from "../context/CartContext";
import { get } from "http";

const Header = () => {
  const { user,getCartItems,cartItems,cartItemCount } = useShoppingCart();
  
  console.log('userName:',user.Name);
 
  return (
    <header className="w-full sticky top-0 ">
      <nav className="flex items-center justify-between bg-gray-800 p-4">
        <div className="flex items-center">
          <Link to="/" className="text-white mr-4">
            Home
          </Link>
        </div>
        <h2 className="flex justify-center text-white text-[24px] font-bold tracking-wide bg-blend-darken">
          Easy Groceries Online Shop
        </h2>
        <div className="flex items-center flex-row ">
          <Link to="/shopcart" className="text-white  flex flex-row mr-3">
            <i className="fas fa-shopping-cart text-2xl text-blue-500"></i>
            <span className=" ml-[2px] text-yellow-100 mt-[-8px]">
              {cartItemCount}
            </span>
          </Link>
           {user.Name === undefined || user.Name==='undefined' ? ( 
          <Link to= "/Login" className="text-white mr-4">
            Login
          </Link>
          ) : (
            <span className="text-white mr-4">{user.Name}</span>            
          )}
        </div>
      </nav>
    </header>
  );
}
export default Header
import React, { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Productlist from "./components/Productlist";
import SearchBar from "./components/SearchBar";
import { Route, Link,Routes, BrowserRouter as Router} from 'react-router-dom';

import  ShoppingCartContext, { ShoppingCartProvider} from "./context/CartContext";
import Login from "./components/Login";
import Header from "./components/Header";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import ProductDetail from "./components/ProductDetail";
import ShopCart from "./components/ShopCart";
import CheckoutConfirm from "./components/CheckoutConfirm";

function App() {
  // const [userName, setUserName] = useState("");
  // const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return ( 
    <div className=" flex flex-col items-center bg-blue-200 h-[100vh-20px] mt-0">
      <ShoppingCartContext.Provider value={{}} >
        <ShoppingCartProvider >
        <Router>
            <Header />
               <Routes>
                <Route path="/" element={<Productlist />} />
                <Route path="/shopcart" element={<ShopCart />} />
                <Route path="/Login" element={<Login/>} /> 
                <Route path="/productdetail" element={<ProductDetail id={0} name={""} price={0} image={""} />} />
                <Route path="/checkout" element={<Checkout/>} /> 
                <Route path="/checkoutconfirm" element={<CheckoutConfirm />} /> 
                
              </Routes>
              <Footer/>
        </Router>
        </ShoppingCartProvider>
      </ShoppingCartContext.Provider>
    </div>
  );
}

export default App;

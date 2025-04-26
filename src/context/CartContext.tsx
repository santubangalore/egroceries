import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../lib/Users";



type ShoppingCartProviderProps = {
  children: ReactNode;
};

export type CartItem = { 
  productId: number;
  description: string;
  image: string;
  quantity: number;
  price: number;
  discounted_price: number;
  purchasedate: Date;
};

 const ShoppingCartContext = createContext({} as any);


export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState([] as CartItem[]);
  const [user, setUser] = useState<User>({} as User);   
  const [cartItemCount, setCartItemCount] = useState(0);  

  const addToCart = async (item: CartItem): Promise<void> => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.productId === item.productId);
    
    if (isItemInCart) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      //console.log('item:',item);
      cartItems.push(item);

      //setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    const totalItems = cartItems.reduce((result, item) => {
      return result + item.quantity ;
    }, 0);
    console.log('cartItems,totalItems:',cartItems,totalItems);
    setCartItemCount(totalItems);
  };

  const removeFromCart = (item: CartItem): void => {
    const isItemInCart = cartItems.find((cartItem) => cartItem.productId === item.productId);

    if (isItemInCart && isItemInCart.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.productId !== item.productId));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
    const totalItems = cartItems.reduce((result, item) => {
      return result + item.quantity ;
    }, 0);
    console.log('cartItems,totalItems:',cartItems,totalItems);


    setCartItemCount(totalItems);
  
  };

  const clearCart = (): void => {
    setCartItems([]);
    setCartItemCount(0);
  };

  const getCartItems = (): CartItem[] => {
    return cartItems;
  }
  
  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

   const calcDiscountExceptLoyaltyItem = ():number=>
    {
      let discountedItems=cartItems.filter((item:CartItem)=>item.description!=='Loyalty membership');
      let loyaltyItems=cartItems.filter((item:CartItem)=>item.description==='Loyalty membership');
      const tot= discountedItems.reduce((total:number, item:CartItem) => total + (item.price * item.quantity)*0.8, 0);
      const loyaltytot= loyaltyItems.reduce((total:number, item:CartItem) => total + item.price * item.quantity, 0);
      cartItems.map((item:CartItem) =>{
        if(item.description!=='Loyalty membership')
          item.discounted_price=(item.price*0.8);
      });

      return tot+loyaltytot;
    }
  

  return (
    <ShoppingCartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartItems,
        cartItems,
        user,
        cartItemCount,
        calcDiscountExceptLoyaltyItem,
        setUser
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartContext
//export const useCart = () => useContext(ShoppingCartContext);

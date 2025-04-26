import { useEffect, useState } from "react";
import ProductDetail from "./ProductDetail"
//import "./Productlist.css";

import { Product } from "../lib/Product";


const Productlist = () => {

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [count, setCount] = useState(0);
    const [disableButton, setDisableButton] = useState(false);

   useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5224/api/groceries')
    .then((res) => res.json())
    .then((json) =>{        
        setProducts(json as Product[]);
        setLoading(false);
     }
    );
}, []);


  return (
    <div className="flex justify-center items-center flex-col mt-10" >
        {products.map((product,i) => (
            <ProductDetail id={product.id} name={product.title} price={product.price} image={product.image} key={i}/>
        ))}
    </div>
  )
}
export default Productlist
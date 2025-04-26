import { useState, useContext } from "react";
import ShoppingCartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { User } from "../lib/Users";

const Login = () => {
  const { user,setUser,cartItemCount } = useContext(ShoppingCartContext);
  const navigate= useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
     console.log("Email:", email, "Password:", password);
     event.preventDefault();

     const usr: User = {Id: 1, Name: "Ganesh", email: email, password: password, isLoyaltyMember: false};
     setUser(usr);
     
     navigate ("/");
  };

  return (
    <div className="flex justify-center items-center flex-col mt-10 lg:px-8 h-[450px] bg-slate-500 rounded-lg">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <form className="mt-10 h-full">
          <div>
            <label className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                required 
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                formNoValidate={false}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
              
              </div>
            </div>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <Button 
                          buttonText="Sign in"
                          handleClick={doLogin} fontSize={0}
                isdisabled={false}            
            />

          </div>

      </form>
    </div>
  );
};
export default Login;

import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home";
import Menu from "../pages/menu/Menu";
import OrderShop from "../pages/Order/OrderShop";
import Login from "../pages/login/Login";
import SignUp from "../pages/signUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../shared/Secret";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
        {
            path: '/',
            element: <Home></Home>,
            handle: { title: "Bistro Boss Restaurant | Home" }            
        },
        {
            path: 'menu',
            element: <Menu></Menu>,
            handle: { title: "Bistro Boss | Menu" }
        },
        {
            path: 'order/:category',
            element: <OrderShop></OrderShop>,
            handle: { title: "Bistro Boss | Shop" }
        },
        {
            path: 'login',
            element: <Login></Login>,
            handle: { title: "Bistro Boss | Login" }
        },
        {
            path: 'signup',
            element: <SignUp></SignUp>,
            handle: { title: "Bistro Boss | SignUp" }
        },
        {
            path: 'secret',
            element: <PrivateRoute> <Secret></Secret> </PrivateRoute>,

        },
    ]
  },
]);
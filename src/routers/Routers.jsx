import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home";
import Menu from "../pages/menu/Menu";
import OrderShop from "../pages/Order/OrderShop";
import Login from "../pages/login/Login";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
        {
            path: '/',
            element: <Home></Home>,
        },
        {
            path: 'menu',
            element: <Menu></Menu>,
        },
        {
            path: 'order/:category',
            element: <OrderShop></OrderShop>,
        },
        {
            path: 'login',
            element: <Login></Login>,
        },
    ]
  },
]);
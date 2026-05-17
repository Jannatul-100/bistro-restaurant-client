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
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import Contact from "../pages/Contact";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItems from "../pages/Dashboard/UpdateItems/UpdateItems";




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
            path: 'contact',
            element: <Contact></Contact>,
            handle: { title: "Bistro Boss | Contact" }
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

    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute> <Dashboard></Dashboard> </PrivateRoute> ,
    handle: { title: "Bistro Boss | Dashboard" },
    children: [
      // normal user routes
      {
        path: 'cart',
        element:<Cart></Cart>,
        handle: { title: "Bistro Boss | Cart" }
      },


      //admin routes
      {
        path: 'addItems',
        element:  <AdminRoute> <AddItems></AddItems> </AdminRoute>,
        handle: { title: "Bistro Boss | Add Items" }
      },
      {
        path: 'manageItems',
        element:  <AdminRoute> <ManageItems></ManageItems> </AdminRoute>,
        handle: { title: "Bistro Boss | Manage Items" }
      },
      {
        path: 'updateItems/:id',
        element:  <AdminRoute> <UpdateItems></UpdateItems> </AdminRoute>,
        loader: async ({params}) => await fetch(`http://localhost:5000/menu/${params.id}`),
        handle: { title: "Bistro Boss | Update Items" }
      },
      {
        path: 'users',
        element:<AdminRoute><AllUsers></AllUsers></AdminRoute>,
        handle: { title: "Bistro Boss | All Users" }
      },
    ]
  }
]);
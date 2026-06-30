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
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ErrorPage from "../ErrorPage/ErrorPage";
import UserHome from "../pages/Dashboard/User/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";
import AddReview from "../pages/Dashboard/User/AddReview/AddReview";
import Reservation from "../pages/Dashboard/User/Reservation/Reservation";
import Bookings from "../pages/Dashboard/User/Bookings/Bookings";
import ManageBookings from "../pages/Dashboard/Admin/ManageBookings/ManageBookings";





export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            path: '/',
            element: <Home></Home>,
            handle: { title: "Bistro Boss | Home" }            
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
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // normal user routes
      {
        path: 'userHome',
        element:<UserHome></UserHome>,
        handle: { title: "Bistro Boss | User Home" }
      },
      {
        path: 'cart',
        element:<Cart></Cart>,
        handle: { title: "Bistro Boss | Cart" }
      },
      {
        path: 'payment',
        element:<Payment></Payment>,
        handle: { title: "Bistro Boss | Payment" }
      },
      {
          path: 'paymentHistory',
          element: <PaymentHistory></PaymentHistory>,
          handle: { title: "Bistro Boss | Payment History" }
      },
      {
          path: 'review',
          element: <AddReview></AddReview>,
          handle: { title: "Bistro Boss | Add Review" }
      },
      {
          path: 'reservations',
          element: <Reservation></Reservation>,
          handle: { title: "Bistro Boss | Reservation" }
      },
      {
          path: 'bookings',
          element: <Bookings></Bookings>,
          handle: { title: "Bistro Boss | Bookings" }
      },


      //admin routes
      {
        path: 'adminHome',
        element:<AdminRoute> <AdminHome></AdminHome> </AdminRoute>,
        handle: { title: "Bistro Boss | Admin Home" }
      },
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
        path: 'manageBookings',
        element:  <AdminRoute> <ManageBookings></ManageBookings> </AdminRoute>,
        handle: { title: "Bistro Boss | Manage Bookings" }
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
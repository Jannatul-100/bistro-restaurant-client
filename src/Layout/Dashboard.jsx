import { useEffect } from "react";
import { FaBars, FaBook, FaCalendar, FaHome, FaList, FaShoppingBag, FaShoppingCart, FaUsers } from "react-icons/fa";
import { FaSpoon } from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import { MdEmail, MdReviews } from "react-icons/md";
import { Link, NavLink, Outlet, useMatches } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import logo from '../../src/assets/Main-Logo.png';

const Dashboard = () => {

    const matches = useMatches();

    useEffect(() => {
        const title = matches
        .slice()
        .reverse()
        .find(match => match.handle?.title)?.handle.title;

        if (title) document.title = title;
    }, [matches]);

    const [isAdmin] = useAdmin();

    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout()
            .then(() => {})
            .catch(console.error);
    };


    return (
        <div className="flex">
            {/* side bar */}
            <div className="w-40 md:w-52 lg:w-64 min-h-screen bg-orange-300">
                <div className="pt-8 pb-4 px-0 md:px-2 lg:px-4 ">
                
                    <Link to="/" className='flex items-center '>
                        <img src={logo} alt='logo' className='w-16 h-16 md:w-20 md:h-20'></img> 
                         <div>
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide text-[#A86A1F] ">
                        Bistro
                        </h1>
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                        Restaurant
                        </p>
                        </div>
                    </Link>
                
                </div>

                <div className="p-2 md:p-4 lg:p-6">
                    <div className="flex items-center gap-3">

                        {/* Profile Image */}
                        
                        {
                            user?.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt="Profile"
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-[#C28B3C]"
                                />
                            ) : (
                                <FaUserCircle className="w-10 h-10 md:w-12 md:h-12 text-white" />
                            )
                        }

                        {/* Name & Email */}
                        <div>
                            <h2 className="font-semibold text-sm md:text-base">
                                {user?.displayName || "User"}

                                <span
                                    className={`text-[10px] md:text-xs px-2 py-0.5 mx-1 rounded-full text-white ${
                                        isAdmin ? "bg-red-500" : "bg-blue-500"
                                    }`}
                                >
                                    {isAdmin ? "Admin" : "User"}
                                </span>
                            </h2>

                            <p className="text-xs opacity-70 break-all">
                                {user?.email}
                            </p>
                        </div>
                        
                    </div>
                    
                </div>
                <div className="divider "></div>

                <ul className="menu p-2 md:p-4 lg:p-6 sentence md:uppercase">
                    
                {
                    isAdmin ? 
                    <>
                 {/* Admin Home */}
                    <li>
                        <NavLink to="/dashboard/adminHome" className={({ isActive }) => 
                            isActive 
                            ? " text-white " 
                                : ""
                        }> 
                        <FaHome></FaHome> Admin Home</NavLink>
                    </li>

                    {/* Add Items */}
                    <li>
                        <NavLink to="/dashboard/addItems" className={({ isActive }) => 
                            isActive 
                            ? " text-white " 
                            : ""
                        }><ImSpoonKnife></ImSpoonKnife> Add Items </NavLink>
                    </li>

                        {/*Manage Items */}
                    <li>
                        <NavLink to="/dashboard/manageItems"  className={({ isActive }) => 
                            isActive 
                            ? " text-white " 
                            : ""
                        }> <FaList></FaList> Manage Items </NavLink>
                    </li>

                    {/* Manage Bookings*/}
                    <li>
                        <NavLink to="/dashboard/manageBookings"  className={({ isActive }) => 
                            isActive 
                            ? " text-white " 
                            : ""
                        }> <FaBook></FaBook> Manage Bookings </NavLink>
                    </li>
                    
                    {/* All Users */}
                    <li>
                        <NavLink to="/dashboard/users"  className={({ isActive }) => 
                            isActive 
                            ? " text-white " 
                            : ""
                        }><FaUsers></FaUsers> All Users </NavLink>
                    </li>
                    </>
                    :
                    <>
                    {/* user things */}
                        {/* userHome */}
                        <li>
                            <NavLink to="/dashboard/userHome" className={({ isActive }) => 
                                isActive 
                                ? " text-white " 
                                : ""
                            }> 
                            <FaHome></FaHome> User Home</NavLink>
                        </li>


                            {/* cart */}
                        <li>
                            <NavLink to="/dashboard/cart"  className={({ isActive }) => 
                                isActive 
                                ? " text-white " 
                                : ""
                            }> <FaShoppingCart></FaShoppingCart> My Cart </NavLink>
                        </li>

                         {/* Payment History */}
                        <li>
                            <NavLink to="/dashboard/paymentHistory" className={({ isActive }) => 
                                isActive 
                                ? " text-white " 
                                : ""
                            }>
                            <FaList></FaList>
                            Payment History</NavLink>
                        </li>

                        {/* reservation */}
                        <li>
                            <NavLink to="/dashboard/reservations" className={({ isActive }) => 
                                isActive 
                                ? " text-white " 
                                : ""
                            }><FaCalendar></FaCalendar> Reservation </NavLink>
                        </li>

                        {/* bookings */}
                        <li>
                            <NavLink to="/dashboard/bookings"  className={({ isActive }) => 
                                isActive 
                                ? " text-white " 
                                : ""
                            }><FaList></FaList> My Bookings </NavLink>
                        </li>

                        {/* review */}
                        <li>
                            <NavLink to="/dashboard/review"  className={({ isActive }) => 
                                isActive 
                                ? " text-white " 
                                : ""
                            }><MdReviews /> Add Review </NavLink>
                        </li>
                        

                    </>
                }

                    <div className="divider "></div>
                    {/* shared nav links */}
                    
                    <li>
                        <NavLink to="/"  className={({ isActive }) => 
                            isActive 
                            ? " text-white " 
                            : ""
                        }><FaHome></FaHome> Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/menu"  className={({ isActive }) => 
                            isActive 
                            ? " text-white " 
                            : ""
                        }><FaBars></FaBars> Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad"  className={({ isActive }) => 
                            isActive 
                            ? " text-white " 
                            : ""
                        }><FaShoppingBag></FaShoppingBag> Shop</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact"  className={({ isActive }) => 
                            isActive 
                            ? " text-white " 
                            : ""
                        }><MdEmail /> Contact</NavLink>
                    </li>

                    <div className="divider"></div>

                    <li>
                        <button onClick={handleLogout} className="sentence md:uppercase">
                            <FaSignOutAlt />
                            Logout
                        </button>
                    </li>

                </ul>
                
            </div>

            {/* dashboard content */}
            <div className="flex-1 px-6 md:px-8 lg:px-12 pb-6 md:pb-8 lg:pb-10">
                <Outlet></Outlet>
            </div>
  
        </div>
    );
};

export default Dashboard;
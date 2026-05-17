import { useEffect } from "react";
import { FaBars, FaBook, FaCalendar, FaHome, FaList, FaShoppingBag, FaShoppingCart, FaUsers } from "react-icons/fa";
import { FaSpoon } from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import { MdEmail, MdReviews } from "react-icons/md";
import { Link, NavLink, Outlet, useMatches } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";



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

    return (
        <div className="flex">
            {/* side bar */}
            <div className="w-40 md:w-52 lg:w-64 min-h-screen bg-orange-300">
                <div className="p-6 md:p-8 lg:p-10">
                    <Link to="/">
                        <p className="text-md md:text-xl font-bold">BISTRO BOSS</p>
                         <p className="text-sm font-bold">RESTAURANT</p>
                    </Link>
                </div>

                <ul className="menu p-2 md:p-4 lg:p-6 sentence md:uppercase">
                    
                {
                    isAdmin ? 
                    <>
                 {/* Admin Home */}
                    <li>
                        <NavLink to="/dashboard/adminHome" className={({ isActive }) => 
                            isActive 
                            ? "bg-black text-white rounded-lg" 
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
                                        {/* userHome */}
                        <li>
                            <NavLink to="/dashboard/userHome" className={({ isActive }) => 
                                isActive 
                                ? "bg-black text-white rounded-lg" 
                                : ""
                            }> 
                            <FaHome></FaHome> User Home</NavLink>
                        </li>

                        {/* reservation */}
                        <li>
                            <NavLink to="/dashboard/reservation" className={({ isActive }) => 
                                isActive 
                                ? " text-white " 
                                : ""
                            }><FaCalendar></FaCalendar> Reservation </NavLink>
                        </li>

                            {/* cart */}
                        <li>
                            <NavLink to="/dashboard/cart"  className={({ isActive }) => 
                                isActive 
                                ? " text-white " 
                                : ""
                            }> <FaShoppingCart></FaShoppingCart> My Cart </NavLink>
                        </li>

                        {/* review */}
                        <li>
                            <NavLink to="/dashboard/review"  className={({ isActive }) => 
                                isActive 
                                ? " text-white " 
                                : ""
                            }><MdReviews /> Add Review </NavLink>
                        </li>
                        
                        {/* bookings */}
                        <li>
                            <NavLink to="/dashboard/bookings"  className={({ isActive }) => 
                                isActive 
                                ? " text-white " 
                                : ""
                            }><FaList></FaList> My Bookings </NavLink>
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
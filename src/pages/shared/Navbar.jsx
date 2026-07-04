
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import useCart from '../../hooks/useCart';
import useAdmin from '../../hooks/useAdmin';
import logo from '../../../src/assets/Main-Logo.png';

const Navbar = () => {

    const {user, logout} = useContext(AuthContext);
    const [cart] = useCart();
    const [isAdmin] = useAdmin();

    const handleLogout = () =>{
        logout()
        .then(() =>{
            console.log("User logged out");
        })
        .catch(error => console.log(error));
    }

    const links = 
    <>
        <li><NavLink to="/" className={({ isActive }) => isActive ? "text-[#B67A2D] font-semibold" : "hover:text-[#C28B3C]"}>HOME</NavLink></li>
        <li><NavLink to="contact" className={({ isActive }) => isActive ? "text-[#B67A2D] font-semibold" : "hover:text-[#C28B3C]"}>CONTACT US</NavLink></li>

        {user && (
            <li><NavLink to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"} 
            className={({ isActive }) => isActive ? "text-[#B67A2D] font-semibold" : "hover:text-[#C28B3C]"}>DASHBOARD</NavLink></li>
        )}

        <li><NavLink to="/menu" className={({ isActive }) => isActive ? "text-[#B67A2D] font-semibold" : "hover:text-[#C28B3C]"}>OUR MENU</NavLink></li>
        <li><NavLink to="/order/salad" className={({ isActive }) => isActive ? "text-[#B67A2D] font-semibold" : "hover:text-[#C28B3C]"}>OUR SHOP</NavLink></li>
        
        {!isAdmin && ( 
            <li>
                <Link to="/dashboard/cart" className="flex ">
                    <span className='btn-sm rounded-full bg-gray-400 px-2 py-1 lg:py-2 flex items-center gap-1 '>
                        <FaShoppingCart className='w-4 h-4'/> 
                        <div className="badge badge-sm badge-secondary">+{cart.length}</div>
                    </span>
                </Link>
            </li>
        )}
        

    </>

    const logInOut = 
    <>

            {
                user ? 
                <div className="flex items-center gap-2">
                    <button onClick={handleLogout} className='btn rounded-full btn-sm md:btn-md bg-[#C28B3C] text-white border-0'>LOGOUT</button>
                    
                    <div className="flex items-center gap-1">
                        <FaUserCircle className='w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6'/>
                        <p className='text-sm md:text-md'>{user?.displayName}</p> 
                    </div>
                </div> 
                : 
                <Link to="/login" className="btn btn-md md:btn-lg bg-[#C28B3C] text-white border-0 rounded-full">LOGIN</Link>
            }
       
    </>

    return (
        <div className="navbar fixed z-10 text-white bg-black/30 max-w-screen-xl px-2 md:px-4 w-full left-0 right-0 mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 text-black rounded-box z-1 mt-3 w-52 p-2 shadow ">
                        {links}
                    </ul>
                </div>
                <div>
                    <Link to="/" className='flex items-center '>
                        <img src={logo} alt='logo' className='w-16 h-16 md:w-20 md:h-20'></img> 
                         <div className="hidden md:block">
                        <h1 className="text-3xl font-bold tracking-wide text-[#B67A2D]">
                        Bistro
                        </h1>
                        <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                        Restaurant
                        </p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex ">
                <ul className="menu menu-horizontal px-1 items-center">
                {links}
                </ul>
            </div>
            <div className="navbar-end mr-4">
                {logInOut}
            </div>
        </div>
    );
};

export default Navbar;


//awesome-react-components => for using ui
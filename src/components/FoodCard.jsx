import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
// import axios from "axios";


const FoodCard = ({item}) => {

    const {image, price, recipe, name, _id, category} = item; 
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();
    const [isAdmin] = useAdmin();

    const handleAddToCart = () =>{
        
        if(user && user.email){
            //send cart item to the database
            // console.log(food, user?.email);

            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price,
                category

            }
            axiosSecure.post('http://localhost:5000/carts', cartItem)
            .then(res =>{
                console.log(res.data);
                if(res.data.insertedId){
                    Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `${name} added to your cart`,
                    showConfirmButton: false,
                    timer: 1500
                    });
                    //refetch cart to update the cart items count
                    refetch();
                }
            })
        }
        else{
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to this cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
                }).then((result) => {
                if (result.isConfirmed) {
                    //send the user to login page
                    navigate('/login', {state: {from: location}});
                }
             });
        }
    }

    return (

            <div className="card bg-base-100 shadow-lg">
                <figure>
                    <img src={image} alt="" className="h-56 w-full object-cover" />
                </figure>
                <p className=" absolute right-0 mr-4 mt-4 px-4 py-2 text-sm text-white bg-slate-900 font-semibold">${price}</p>
                <div className="card-body text-center bg-base-300">
                    <h2 className="font-bold text-lg">{name}</h2>
                    <p className="text-sm text-gray-600">{recipe}</p>
                    
                    {isAdmin ? 
                    <>
                    <button 
                    className="btn btn-outline border-0 border-b-4 mx-auto bg-gray-300 text-yellow-600 hover:bg-gray-800  hover:text-yellow-600 hover:border-b-0  mt-3">ADD TO CART</button>
                    </> 
                    :
                    <>
                    <button 
                    onClick={handleAddToCart}
                    className="btn btn-outline border-0 border-b-4 mx-auto bg-gray-300 text-yellow-600 hover:bg-gray-800  hover:text-yellow-600 hover:border-b-0  mt-3">ADD TO CART</button>
                    </> }

                </div>
            </div>
    

    );
};

export default FoodCard;
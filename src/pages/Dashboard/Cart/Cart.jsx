
import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import SectionTitle from "../../../components/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const Cart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();

  const handleDelete = id =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
        }).then((result) => {
        if (result.isConfirmed) {

            axiosSecure.delete(`/carts/${id}`)
            .then(res =>{
                if(res.data.deletedCount > 0){
                refetch();
                Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
                });
                }
            })
        }
    });
  }

  return (
    <div>
        <SectionTitle
            subHeading={"My Cart"}
            heading={"Wanna Add More?"}
            >
        </SectionTitle>

      <div className="flex justify-between items-center mb-10 md:mb-12 font-bold">
        <h2 className="text-xl md:text-2xl lg:text-3xl ">Total Orders: {cart.length}</h2>
        <h2 className="text-xl md:text-2xl lg:text-3xl ">Total Price: ${totalPrice}</h2>
        <button className="btn px-5 md:px-8 lg:px-10 py-4 lg:py-5 font-bold bg-orange-300 text-md md:text-lg lg:text-xl">Pay</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-orange-300 ">
            <tr>
              <th>
                #
              </th>
              <th>Item Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                cart.map((item, index) => <tr key={item._id}>
                <th>
                    {index + 1}
                </th>
                <td>
                    <div className=" items-center">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                        <img
                            src={item.image}
                            alt=""
                        />
                        </div>
                    </div>
                    </div>
                </td>
                <td>
                    <div className="font-bold opacity-50">{item.name}</div>
                    <div className="text-sm opacity-50 sentence">{item.category}</div>
                </td>
                <td className="font-bold opacity-50">${item.price}</td>
                <th>
                    <button
                    onClick={()=> handleDelete(item._id)}
                     className="btn btn-sm bg-red-600 text-white text-lg"><FaTrashAlt></FaTrashAlt></button>
                </th>
                </tr>
                )
            }

        </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useMenu from "../../../hooks/useMenu";
import { Link } from "react-router-dom";
import { useState } from "react";


const ManageItems = () => {

    const axiosSecure = useAxiosSecure();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [menu, refetch] = useMenu();
     
    const filteredMenu =
    selectedCategory === "all"
        ? menu
        : menu.filter(item => item.category === selectedCategory);


    const handleDeleteItem = (item) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
            if (result.isConfirmed) {
    
                axiosSecure.delete(`/menu/${item._id}`)
                .then(res =>{
                    if(res.data.deletedCount > 0){
                    refetch();
                    Swal.fire({
                    title: "Deleted!",
                    text: `${item.name} has been deleted.`,
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
            subHeading={"Hurry Up!"}
            heading={"Manage All Items"}
            >
        </SectionTitle>

        <div className="flex justify-between items-center mb-5 ">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                Total Items: {filteredMenu.length}
            </h2>

            <select
                className="select select-bordered w-1/2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="all">All Categories</option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
                <option value="offered">Offered</option>
            </select>
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
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
                filteredMenu.map((item, index) => <tr key={item._id}>
                <th>
                    {index + 1}
                </th>
                <td> 
                    <div className="items-center">
                        <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16">
                            <img
                                src={item.image}
                                alt=""
                            />
                            </div>
                        </div>
                    </div>
                </td>

                <td>
                    <div className="text-sm md:text-md lg:text-lg font-bold opacity-50">{item.name}</div>
                    <div className="text-sm opacity-50 sentence">{item.category}</div>
                </td>

                <td className="text-sm md:text-md lg:text-lg font-bold opacity-50">${item.price}</td>

                <td>
                    <Link to={`/dashboard/updateItems/${item._id}`}>
                      <button
                      className="btn btn-sm lg:btn-md bg-orange-300 text-white text-lg">
                        <FaEdit></FaEdit></button>
                    </Link>
                </td>
                <td>
                    <button
                    onClick={()=> handleDeleteItem(item)}
                     className="btn btn-sm lg:btn-md bg-red-600 text-white text-lg"><FaTrashAlt></FaTrashAlt></button>
                </td>
                </tr>
                )
            }

        </tbody>
        </table>
      </div>
    </div>
    );
};

export default ManageItems;
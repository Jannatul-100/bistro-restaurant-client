import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEye, FaTrashAlt, FaUsers } from "react-icons/fa";
import SectionTitle from "../../../../components/SectionTitle";
import { useState } from "react";


const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);


    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = (user) => {
    Swal.fire({
        title: "Make Admin?",
        text: `Do you want to make ${user.name} an admin?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#f59e0b",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Make Admin",
        cancelButtonText: "Cancel",
    }).then((result) => {
        if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then((res) => {
            if (res.data.modifiedCount > 0) {
                refetch();

                Swal.fire({
                position: "center",
                icon: "success",
                title: `${user.name} is now an Admin!`,
                showConfirmButton: false,
                timer: 1500,
                });
            }
            });
        }
    });
    };

    const handleDeleteUser = user =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then( async (result) => {
            if (result.isConfirmed) {
    
                axiosSecure.delete(`/users/${user._id}`)
                .then(res =>{
                    if(res.data.deletedCount > 0){
                    refetch();
                    Swal.fire({
                    title: "Deleted!",
                    text: `${user.name} has been deleted.`,
                    icon: "success"
                    });
                    }
                })
            }
        });
      }


    const handleView = async (user) => {
        setSelectedUser(user);

        const res = await axiosSecure.get(`/admin/users/${user.email}/details`);

        setUserDetails(res.data);

        document.getElementById("user_modal").showModal();
    };


    return (
    <div>
        <SectionTitle
            subHeading={"How Many?"}
            heading={"Manage All Users"}
            >
        </SectionTitle>

      <div className=" font-bold">
        <h2 className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-orange-300 ">
            <tr>
              <th>
                #
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                users.map((user, index) => <tr key={user._id}>
                <th>
                    {index + 1}
                </th>
                <td className="font-bold opacity-50"> {user.name}</td>
                <td className="font-bold opacity-50">{user.email}</td>

                <td>
                    {
                      user.role === 'admin' ? <span className="font-bold opacity-50">Admin</span> : 
                      <button
                      onClick={()=> handleMakeAdmin(user)}
                      className="btn btn-sm lg:btn-md bg-orange-300 text-white text-lg">
                        <FaUsers></FaUsers> </button>
                     }
                </td>

                <td>

                <button
                    className="btn btn-sm lg:btn-md bg-blue-400  text-white text-lg"
                    onClick={() => handleView(user)}
                >
                    <FaEye />
                </button>
                </td>
                
                <td>
                    <button
                    onClick={()=> handleDeleteUser(user)}
                     className="btn btn-sm lg:btn-md bg-red-600 text-white text-lg"><FaTrashAlt></FaTrashAlt></button>
                </td>
                </tr>
                )
            }

        </tbody>
        </table>
      </div>

        <dialog id="user_modal" className="modal">
            <div className="modal-box max-w-3xl">

                <h2 className="text-3xl font-bold mb-6 text-center">
                    User Details
                </h2>

                {
                    userDetails &&

                    <div className="space-y-8">

                        {/* Profile */}

                        <div className="flex items-center gap-6">

                            <img
                                src={userDetails.photo || "https://i.ibb.co/4pDNDk1/avatar.png"}
                                className="w-24 h-24 rounded-full object-cover border"
                            />

                            <div>

                                <h2 className="text-2xl font-bold flex gap-2">
                                    {userDetails.name}
                                    <span className="badge badge-warning mt-2">
                                    {userDetails.role}
                                    </span>
                                </h2>

                                <p>{userDetails.email}</p>

                                <p>📞 {userDetails.phone || "Not Added"}</p>

                                <p>📍 {userDetails.address || "Not Added"}</p>

                            </div>

                        </div>

                        <div className="divider"></div>

                        {/* Summary */}

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

                            <div className="stat bg-base-200 rounded-lg">

                                <div className="stat-title">
                                    Orders
                                </div>

                                <div className="stat-value text-primary">
                                    {userDetails.orderCount}
                                </div>

                            </div>

                            <div className="stat bg-base-200 rounded-lg">

                                <div className="stat-title">
                                    Items
                                </div>

                                <div className="stat-value text-secondary">
                                    {userDetails.itemCount}
                                </div>

                            </div>

                            <div className="stat bg-base-200 rounded-lg">

                                <div className="stat-title">
                                    Payments
                                </div>

                                <div className="stat-value">
                                    {userDetails.paymentCount}
                                </div>

                            </div>

                            <div className="stat bg-base-200 rounded-lg">

                                <div className="stat-title">
                                    Bookings
                                </div>

                                <div className="stat-value">
                                    {userDetails.bookingsCount}
                                </div>

                            </div>

                            <div className="stat bg-base-200 rounded-lg">

                                <div className="stat-title">
                                    Spent
                                </div>

                                <div className="stat-value text-success">
                                    ${userDetails.totalSpent}
                                </div>

                            </div>

                        </div>

                        <div className="divider"></div>

                        {/* Payments */}

                        <div>

                            <h2 className="font-bold text-xl mb-3">
                                Recent Payments
                            </h2>

                            <table className="table table-zebra">

                                <thead className="bg-orange-300">

                                    <tr>

                                        <th>Date</th>

                                        <th>Amount</th>

                                        <th>Items Ordered</th>

                                        {/* <th>Items Name</th> */}

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        userDetails.recentPayments.map((payment,index)=>

                                        <tr key={index} onClick={() => setSelectedPayment(payment)}>

                                            <td>{payment.date}</td>

                                            <td>${payment.price}</td>

                                            <td>{payment.totalItems}</td>

                                            {/* <td>{payment.items.join(", ")}</td> */}

                                        </tr>

                                        )
                                    }

                                </tbody>

                            </table>

                        </div>

                        <div className="divider"></div>


                        {/* Purchased Items */}

                        <div>

                            <h2 className="font-bold text-xl mb-3">
                                Purchased Items
                            </h2>

                            <div className="overflow-x-auto">

                                <table className="table table-zebra">

                                    <thead className="bg-orange-300">

                                        <tr>

                                            <th>#</th>

                                            <th>Item Name</th>

                                            <th>Quantity</th>

                                            {/* <th>Single Price</th> */}

                                            <th>Total Price</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {
                                            userDetails.items.map((item,index)=>

                                            <tr key={index}>

                                                <td>{index+1}</td>

                                                <td>{item.name} {item.category}</td>

                                                <td>{item.quantity}</td>

                                                {/* <td>{item.price}</td> */}

                                                <td>{item.totalPrice}</td>

                                            </tr>

                                            )
                                        }

                                    </tbody>

                                </table>

                            </div>

                        </div>

                        <div className="divider"></div>

                        
                        {/* Reservations */}

                        <div>

                            <h2 className="font-bold text-xl mb-3">
                                Reservations
                            </h2>

                            <table className="table table-zebra">

                                <thead className="bg-orange-300">

                                    <tr>

                                        <th>Date</th>

                                        <th>Time</th>

                                        <th>Guests</th>

                                        <th>Status</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        userDetails.bookings.map((booking,index)=>

                                        <tr key={index}>

                                            <td>{booking.date}</td>

                                            <td>{booking.time}</td>

                                            <td>{booking.guests}</td>

                                            <td>

                                                <span className="badge">

                                                    {booking.status}

                                                </span>

                                            </td>

                                        </tr>

                                        )
                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                }

                <div className="modal-action">

                    <form method="dialog">

                        <button className="btn btn-lg bg-orange-300">

                            Close

                        </button>

                    </form>

                </div>

            </div>
        </dialog>

    </div>
    );
};

export default AllUsers;
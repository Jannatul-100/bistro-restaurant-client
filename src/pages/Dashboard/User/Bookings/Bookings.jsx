import React from 'react';
import SectionTitle from '../../../../components/SectionTitle';
import useAuth from '../../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const Bookings = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { refetch, data: reservation = [] } = useQuery({
        queryKey: ['reservation', user?.email],
        queryFn: async () =>{
            const res = await axiosSecure.get(`/reservations?email=${user.email}`)
            return res.data
        }
    })
    
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

                axiosSecure.delete(`/reservations/${id}`)
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
                subHeading={"You can see reservations"}
                heading={"My Bookings"}
                >
            </SectionTitle> 

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-orange-300 ">
                        <tr>
                        <th>
                            #
                        </th>
                
                        <th>Date</th>
                        <th>Time</th>
                        <th>Guests</th>
                        <th>Status</th>
                        <th>Details</th>
                        <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            reservation.map((res, index) => <tr key={res._id}>
                            <th>
                                {index + 1}
                            </th>
                            
                            <td className="font-bold opacity-50">{res.date}</td>
                            <td className="font-bold opacity-50">{res.time}</td>
                            <td className="font-bold opacity-50">{res.guests}</td>
                            <td className="font-bold opacity-50">{res.status}</td>
                            <td>
                                <button
                                    className="btn btn-info btn-sm"
                                    onClick={() => {
                                        Swal.fire({
                                            title: "Reservation Details",
                                            html: `
                                                <p><b>Status:</b> ${res.status}</p>
                                                ${
                                                    res.status === "cancelled"
                                                        ? `<p><b>Reason:</b> ${res.cancelReason || "No reason provided"}</p>`
                                                        : ""
                                                }
                                            `,
                                            icon: res.status === "cancelled" ? "error" : "info"
                                        });
                                    }}
                                >
                                    View
                                </button>
                            </td>
                            <th>
                                <button
                                onClick={()=> handleDelete(res._id)}
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

export default Bookings;
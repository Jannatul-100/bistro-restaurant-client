import React from 'react';
import SectionTitle from '../../../../components/SectionTitle';
import { FaCheck, FaTimes, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../../../hooks/useAxiosSecure';


const ManageBookings = () => {

    const axiosSecure = useAxiosSecure();

    const { data: bookings = [], refetch } = useQuery({
        queryKey: ['admin-bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/reservations');
            return res.data;
        }
    });

    const handleStatus = (booking, status) => {

        axiosSecure.patch(`/admin/reservations/${booking._id}`, { status })
            .then(res => {
                if(res.data.modifiedCount > 0){
                    refetch();

                    Swal.fire({
                        icon: "success",
                        title: `Reservation ${status}`,
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            });
    }

        const handleDelete = (booking) => {

            Swal.fire({
                title: "Are you sure?",
                text: "Reservation will be deleted!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Delete"
            }).then(result => {

                if(result.isConfirmed){

                    axiosSecure.delete(`/reservations/${booking._id}`)
                    .then(res =>{

                        if(res.data.deletedCount > 0){

                            refetch();

                            Swal.fire({
                                icon:"success",
                                title:"Deleted Successfully"
                            });

                        }

                    })

                }

            });

        }

        const handleCancel = async (booking) => {

        const { value: reason } = await Swal.fire({
            title: "Cancel Reservation",
            input: "select",
            inputOptions: {
                "Restaurant Full": "Restaurant Full",
                "Maintenance": "Maintenance",
                "Private Event": "Private Event",
                "Other": "Other"
            },
            inputPlaceholder: "Select a reason",
            showCancelButton: true
        });

        if (!reason) return;

        let finalReason = reason;

        if (reason === "Other") {

            const { value } = await Swal.fire({
                title: "Write reason",
                input: "textarea",
                inputPlaceholder: "Type cancellation reason...",
                showCancelButton: true
            });

            if (!value) return;

            finalReason = value;
        }

        const res = await axiosSecure.patch(
            `/admin/reservations/${booking._id}`,
            {
                status: "cancelled",
                cancelReason: finalReason
            }
        );

        if(res.data.modifiedCount){
            refetch();

            Swal.fire({
                icon:"success",
                title:"Reservation Cancelled"
            });
        }

    }


    return (

        <div>
            <SectionTitle
            subHeading={"Restaurant Reservations"}
            heading={"Manage All Bookings"}
            >
        </SectionTitle>

        <div className="font-bold">
                <h2 className="text-xl md:text-2xl lg:text-3xl mb-6">
                    Total Reservations: {bookings.length}
                </h2>
            </div>

            <div className="overflow-x-auto">

                <table className="table">

                    <thead className="bg-orange-300">

                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Guests</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Confirm</th>
                            <th>Cancel</th>
                            <th>Delete</th>
                        </tr>

                    </thead>

                    <tbody>

                        {
                            bookings.map((booking,index)=>

                                <tr key={booking._id}>

                                    <th>{index+1}</th>

                                    <td>
                                        <h2 className="font-bold text-gray-500">
                                            {booking.name}
                                        </h2>
                                        <p className="text-xs opacity-60">
                                            {booking.email}
                                        </p>
                                    </td>

                                    <td>{booking.date}</td>

                                    <td>{booking.time}</td>

                                    <td>{booking.guests}</td>

                                    <td>{booking.phone}</td>

                                    <td>

                                        <span className={`badge
                                        ${
                                            booking.status==="confirmed"
                                            ?"badge-success"
                                            :booking.status==="cancelled"
                                            ?"badge-error"
                                            :"badge-warning"
                                        }`}>

                                            {booking.status}

                                        </span>

                                    </td>

                                    <td>

                                        <button
                                        disabled={booking.status==="confirmed"}
                                        onClick={()=>handleStatus(booking,"confirmed")}
                                        className="btn btn-success btn-sm">

                                            <FaCheck/>

                                        </button>

                                    </td>

                                    <td>

                                        <button
                                        disabled={booking.status==="cancelled"}
                                        onClick={()=>handleCancel(booking)}
                                        className="btn btn-warning btn-sm">

                                            <FaTimes/>

                                        </button>

                                    </td>

                                    <td>

                                        <button
                                        onClick={()=>handleDelete(booking)}
                                        className="btn btn-error btn-sm">

                                            <FaTrashAlt/>

                                        </button>

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

export default ManageBookings;
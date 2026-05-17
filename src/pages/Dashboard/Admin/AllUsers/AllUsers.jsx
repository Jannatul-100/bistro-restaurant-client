import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import SectionTitle from "../../../../components/SectionTitle";


const AllUsers = () => {

    const axiosSecure = useAxiosSecure();
    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user =>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }

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
                    onClick={()=> handleDeleteUser(user)}
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

export default AllUsers;
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    })

    return (
        <div>

            <SectionTitle
                subHeading={"See your payment history"}
                heading={"Payment History"}
                >
            </SectionTitle>
            <h2 className="text-2xl md:text-3xl font-bold pb-6 md:pb-8">Total Payments: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead className="bg-orange-300 ">
                        <tr>
                            <th>#</th>
                            <th>Items</th>
                            <th>Total Price</th>
                            <th>Transaction Id</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((payment, index) => <tr key={payment._id}>
                            <th>{index + 1}</th>
                            <td>{payment.menuItemIds.length}
                                {/* {payment.items?.map((item, index) => (
                                    <div key={index} className="text-xs text-gray-500">
                                    {item.name} × {item.quantity}
                                    </div>
                                ))} */}
                            </td>
                            
                            <td>${payment.price}</td>
                            <td>{payment.transactionId}</td>
                            <td>
                                <span className={`badge ${
                                    payment.status === "Paid"
                                    ? "badge-success"
                                    : payment.status === "Pending"
                                    ? "badge-warning"
                                    : "badge-error"
                                }`}>
                                    {payment.status || "Paid"}
                                </span>
                            </td>
                        <td>{payment.date}</td>
                        </tr>)}   
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
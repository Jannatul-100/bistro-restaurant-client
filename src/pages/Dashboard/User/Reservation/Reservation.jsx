import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import SectionTitle from "../../../../components/SectionTitle";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const {user} = useAuth();
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const reservation = {
        name: user?.displayName || "",
        email: user?.email,
        phone,
        date,
        time,
        guests,
        };

        const res = await axiosSecure.post("/reservations", reservation);

        if (res.data) {
            Swal.fire({
                icon: "success",
                title: "Table Reserved Successfully!",
                timer: 1500,
                showConfirmButton: false,
            });
            navigate('/dashboard/bookings');
        }

        setDate("");
        setTime("");
        setGuests(1);
    };

return (
    <div>
        <SectionTitle
                subHeading={"You can reserve now"}
                heading={"Reservations"}
                >
        </SectionTitle> 
        <div className="max-w-xl mx-auto p-6 shadow-lg rounded">


        <h2 className="text-xl font-bold mb-4 text-center opacity-50">Reserve a Table</h2>

        <form onSubmit={handleSubmit} className="space-y-3">

            {/* Name */}
            <div>
                <label className="opacity-50 font-bold">Name</label>
                <input
                type="text"
                placeholder="Your Name"
                value={user?.displayName}
                
                className="w-full border p-2 rounded"
                required
                />
            </div>
            {/* email */}
            <div>
                <label className="opacity-50 font-bold">Email</label>
                <input
                type="email"
                placeholder="Your Email"
                value={user?.email}
                
                className="w-full border p-2 rounded"
                required
                />
            </div>
            {/* Phone */}
            <div>
                <label className="opacity-50 font-bold">Phone</label>
                <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border p-2 rounded"
                required
                />
            </div>

            {/* Date */}
            <label className="opacity-60 font-bold">Date</label>
            <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full border p-2 rounded"
            required
            />

            {/* Time */}
            <label className="opacity-50 font-bold">Time</label>
            <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
             min="10:00"
             max="22:00"
            className="w-full border p-2 rounded"
            required
            />

            {/* Guests */}
            <label className="opacity-50 font-bold">Total Person</label>
            <input
            type="number"
            min="1"
            max="20"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full border p-2 rounded"
            required
            />

            <button className="w-full bg-orange-400 text-white py-2 font-bold rounded">
            Reserve Now
            </button>
        </form>
        </div>
    </div>
  );
};

export default Reservation;
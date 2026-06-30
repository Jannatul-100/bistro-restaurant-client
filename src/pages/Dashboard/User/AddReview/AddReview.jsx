import {  useState } from "react";
import SectionTitle from '../../../../components/SectionTitle';
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const AddReview = () => {
    const { user } = useAuth();
    const [rating, setRating] = useState(5);
    const [details, setDetails] = useState("");
    // const [reviews, setReviews] = useState([]);
    const axiosPublic = useAxiosPublic();

    const handleSubmit = async (e) => {
    e.preventDefault();

    
    const review = {
      name: user?.displayName || "",
      rating,
      details,
    };


    try {
        const res = await axiosPublic.post("/reviews", review);

        console.log("Review data: ", res.data);
        //   // instantly update UI
        // setReviews((prev) => [res.data, ...prev]);
        // alert("Review added!");
        Swal.fire({
            icon: "success",
            title: "Review added!",
            timer: 1500,
            showConfirmButton: false,
        });
    } catch (error) {
        console.error(error);
    }

    setDetails("");
    setRating(5);
  };

    return (
        <div>
            <SectionTitle
                subHeading={"You can review us"}
                heading={"Add Review!"}
                >
            </SectionTitle> 

        <div className="max-w-xl mx-auto p-6 shadow-lg rounded bg-white">
            <h2 className="text-xl font-bold mb-4 text-center opacity-50">Add Review</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name */}
                <label className="opacity-50 font-bold">Name</label>
                <input
                type="text"
                placeholder="Your name"
                className="w-full border p-2 rounded"
                value={user?.displayName || ""}
                
                required
                />

                {/* Rating */}
                <label className="opacity-50 font-bold">Ratings</label>
                <input
                type="number"
                min="1"
                max="5"
                className="w-full border p-2 rounded"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                />

                {/* Review Text */}
                <label className="opacity-50 font-bold">Review</label>
                <textarea
                placeholder="Write your review..."
                className="w-full border p-2 rounded"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
                />

                <button
                type="submit"
                className="w-full bg-orange-400 text-white py-2 font-bold rounded"
                >
                Submit Review
                </button>
            </form>
        </div>
        </div>
    );
};

export default AddReview;
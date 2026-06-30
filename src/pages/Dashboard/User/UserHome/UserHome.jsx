import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import {
  FaDollarSign,
  FaEye,
  FaEyeSlash,
  FaListAlt,
  FaMoneyBill,
  FaShoppingBag,
  FaShoppingCart,
} from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../../../firebase/firebase.config";

const UserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //user-stats
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["user-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats?email=${user.email}`);
      return res.data;
    },
  });

  //profile
  const {
    data: profile = {},
    refetch,
    isLoading: profileLoading,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/profile");
      return res.data;
    },
  });

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setPhone(profile.phone || "");
      setAddress(profile.address || "");
    }
  }, [profile]);

  if (isLoading || profileLoading) {
    return <progress className="progress w-56 md:w-76"></progress>;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    const userInfo = {
      name,
      phone,
      address,
    };

    const res = await axiosSecure.patch("/profile", userInfo);

    if (res.data.modifiedCount) {
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
      });

      refetch();
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Delete Account?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete("/profile");

        if (res.data.deletedCount) {
          Swal.fire("Deleted!", "Account deleted.", "success");
        }
      }
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return Swal.fire("Passwords don't match");
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );

      await reauthenticateWithCredential(auth.currentUser, credential);

      await updatePassword(auth.currentUser, newPassword);

      Swal.fire({
        icon: "success",
        title: "Password Changed",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.message,
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl md:text-3xl mt-6 font-bold">
        <span>Hi, Welcome </span>
        {user?.displayName ? user.displayName : "Back"}!
      </h2>

      <div className="stats shadow my-6">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaDollarSign className="text-3xl"></FaDollarSign>
          </div>
          <div className="stat-title font-bold">Total Revenue</div>
          <div className="stat-value">{stats?.totalSpent}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaShoppingCart className="text-3xl" />
          </div>
          <div className="stat-title font-bold">Total Orders</div>
          <div className="stat-value">{stats.orderCount}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaShoppingBag className="text-3xl" />
          </div>
          <div className="stat-title font-bold">Total Items</div>
          <div className="stat-value">{stats.itemCount}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaMoneyBill className="text-3xl" />
          </div>
          <div className="stat-title font-bold"> Total Payments</div>
          <div className="stat-value">{stats.paymentCount}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaListAlt className="text-3xl" />
          </div>
          <div className="stat-title font-bold">Total Bookings</div>
          <div className="stat-value">{stats.bookingsCount}</div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-lg my-8 ">
          <div className="card-body">

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="flex gap-8 items-center">
                <img
                  src={user?.photoURL}
                  alt="Profile"
                  className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-orange-400"
                />

                <div>
                  <h2 className="font-bold text-2xl text-gray-500">
                    Edit Profile
                  </h2>
                  <p>Update your personal information and contact details.</p>
                </div>
              </div>

              <input
                type="text"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />

              <input
                type="email"
                className="input input-bordered w-full"
                value={profile.email}
                readOnly
              />

              <input
                type="number"
                className="input input-bordered w-full"
                value={phone}
                maxLength={15}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
              />

              <input
                type="text"
                className="input input-bordered w-full"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />

              <div className="flex gap-3">
                <button className="btn btn-warning">Save Changes</button>
              </div>
            </form>
          </div>
        </div>

        <div className="card shadow-lg bg-base-100 mb-8">
          <div className="card-body">
            <h2 className="text-2xl font-bold">Change Password</h2>

            <form onSubmit={handlePasswordChange}>
              <div className="relative mt-3">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Current Password"
                  className="input input-bordered w-full"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 z-10 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 text-lg"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="relative mt-3">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="input input-bordered w-full mt-3"
                  value={newPassword}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+-])[A-Za-z\d@$!%*?&#]{6,}$"
                  title="Password must be at least 6 characters and include an uppercase letter, lowercase letter, number, and special character."
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 z-10 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 text-lg"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="relative mt-3">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="input input-bordered w-full pr-12"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 z-10 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500 text-lg"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <button className="btn btn-warning mt-5 w-full">
                Change Password
              </button>
            </form>
          </div>
        </div>

        <div className="card border-2 border-red-500 bg-base-100">
          <div className="card-body">
            <h2 className="text-2xl text-red-600 font-bold">Danger Zone</h2>

            <p>
              Deleting your account permanently removes your profile. This
              action cannot be undone.
            </p>

            <button onClick={handleDelete} className="btn btn-error mt-5">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;

import { Link, useNavigate } from "react-router-dom";
import ErrorImg from "../assets/404.gif";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">

      {/* Image */}
      <img
        src={ErrorImg}
        alt="404 error"
        className="w-90 md:w-120 mb-6"
      />

      {/* Message */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
        Page Not Found
      </h1>

      <p className="text-gray-500 mb-6 text-center text-sm md:text-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">

        {/* Back to Home */}
        <Link
          to="/"
          className=" px-3 py-2 md:px-5  bg-orange-400 text-white rounded-lg hover:bg-orange-500"
        >
          Back to Home
        </Link>

        {/* Go Back */}
        <button
          onClick={() => navigate(-1)}
          className="px-3 py-2 md:px-5  bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Go Back
        </button>

      </div>
    </div>
  );
};

export default ErrorPage;
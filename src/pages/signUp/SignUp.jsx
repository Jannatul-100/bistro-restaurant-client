import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";
import { FaArrowRight, FaHome,  FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin";
import bgImage from '../../assets/others/authentication.png';
import authGif from '../../assets/others/authentication.gif';
import logo from '../../assets/Main-Logo.png';


const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const {createUser,  updateUserProfile} = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    

    const onSubmit = (data) => {
        console.log(data)

        createUser(data.email, data.password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser);

            updateUserProfile(data.name, data.photoURL)
            .then(() =>{
                // console.log('user profile info updated');
                //create user entry in the dab
                const userInfo = {
                    name: data.name,
                    email: data.email
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if(res.data.insertedId){
                            reset();
                            Swal.fire({
                                position: "top-center",
                                icon: "success",
                                title: "User created successfully.",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/');
                        }
                    })

            })
            .catch(error => console.log(error))
        })
    }



    return (
    <div className="hero bg-base-200 min-h-screen py-8"
      style={{
        backgroundImage: `url(${bgImage})`
        }}>

        <Link to="/" className="absolute top-4 left-6 md:top-8 md:left-10 lg:top-12 lg:left-40 z-50">
               <img src={logo} alt='logo' className="w-16 h-16 md:w-20 md:h-20"></img>
        </Link>
        <Link to="/" className="flex items-center gap-1 hover:text-[#D1A054] text-sm md:text-md font-bold
            absolute top-4 right-6 md:top-8 md:right-10 lg:top-12 lg:right-40 z-50 btn btn-sm md:btn-md rounded-full">
               <FaHome /> Home 
        </Link>

        <div className="hero-content flex-col lg:flex-row-reverse mt-6">
            <div className="text-center items-center w-full lg:w-1/2 lg:text-left pl-0 lg:pl-8">
                <h1 className="text-4xl md:text-5xl text-center font-bold text-[#D1A054]">SignUp now!</h1>
                <img src={authGif} className=" py-4 md:py-6 lg:py-8 rounded-full px-6 md:px-40 lg:px-0" />
            </div>
            <div className="card bg-base-100 w-full lg::w-1/2 max-w-sm  shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body rounded-lg"
                style={{
                    backgroundImage: `url(${bgImage})`
                  }}>
                    <fieldset className="fieldset">

                        <label className="label">Name</label>
                        <input type="text" {...register("name", { required: true })} name="name" className="input w-full" placeholder="Name"  />
                        {errors.name && <span className="text-red-500">Name is required.</span>}
                       
                        <label className="label">Photo URL</label>
                        <input type="text" {...register("photoURL", { required: true })} name="photoURL" className="input w-full" placeholder="Photo URL"  />
                        {errors.photoURL && <span className="text-red-500">Photo URL is required.</span>}

                        <label className="label">Email</label>
                        <input type="email" {...register("email", { required: true })} name="email" className="input w-full" placeholder="Email" />
                        {errors.email && <span className="text-red-500">Email is required.</span>}

                        <label className="label">Password</label>
                        <div className="relative ">
                        <input type={showPassword ? "text" : "password"}  {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/ , minLength: 6 })} name="password" className="input w-full" placeholder="Password" />
                            {errors.password?.type === 'required' && <span className="text-red-500">Password is required.</span>}
                            {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be 6 characters.</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-500">Password must include uppercase, lowercase, number & special character.</span>}
                              <button type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-sm z-10 text-gray-500 hover:text-black"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <input  className="btn bg-[#C28B3C] text-white mt-4" type="submit" value="Sign Up" />
                    </fieldset>

                    <p className="text-center text-[#D1A054] font-semibold pt-1"> Already registered? <Link to="/login" className="hover:font-bold hover:underline">Go to login.</Link> </p>

                    <div className="divider">OR</div>
                    {/* Google */}
                    <SocialLogin></SocialLogin>
                </form>
                
            </div>
        </div>
    </div>
    );
};

export default SignUp;


//use fromik for those form
//react component e form ache like react hook form
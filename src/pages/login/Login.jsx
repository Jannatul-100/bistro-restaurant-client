import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProviders';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaArrowRight, FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import SocialLogin from '../../components/SocialLogin';
import bgImage from '../../assets/others/authentication.png'
import authImg from '../../assets/others/authentication2.png'


const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const {signIn,  resetPassword} = useContext(AuthContext);
    const [disabled, setDisabled] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    useEffect(() =>{
         loadCaptchaEnginge(6);
    },[])

    const handleLogin = event =>{
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
        .then(result =>{
            const user = result.user;
            console.log(user);

            Swal.fire({
                title: "User Login Successful.",
                showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                    `
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                    `
                }
            });

            navigate(from, {replace: true});
        })

         .catch((error) => {
            let message = "";

            switch (error.code) {
            case "auth/invalid-credential":
                message = "Invalid email or password.";
                break;

            case "auth/user-not-found":
                message = "No account found with this email.";
                break;

            case "auth/wrong-password":
                message = "Incorrect password.";
                break;

            case "auth/invalid-email":
                message = "Please enter a valid email address.";
                break;

            case "auth/too-many-requests":
                message = "Too many failed attempts. Please try again later.";
                break;

            default:
                message = "Login failed. Please try again.";
            }

            Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: message,
            });
        });
    }


    const handleValidateCaptcha = (e) =>{
        const user_captcha_value = e.target.value;

         if (validateCaptcha(user_captcha_value)==true) {
            setDisabled(false);
        }

        else {
            setDisabled(true);
        }
    }

    const handleForgotPassword = () => {
        const email = document.querySelector('input[name="email"]').value;

        if(!email){
            Swal.fire({
                icon: "warning",
                title: "Please enter your email first."
            });
            return;
        }

        resetPassword(email)
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Password reset email sent!"
            });
        })
        .catch(error => {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Failed to send reset email"
            });
        });
    }


    return (
    <div className="hero bg-base-200 min-h-screen py-8"
      style={{
            backgroundImage: `url(${bgImage})`
        }}>

            <Link to="/" className="flex items-center gap-1 hover:text-blue-700 text-sm md:text-md font-bold
            absolute top-4 right-6 md:top-8 md:right-10 lg:top-12 lg:right-40 z-50 btn btn-sm md:btn-md rounded-full">
               <FaHome /> Home 
            </Link>

        <div className="hero-content flex-col lg:flex-row ">
            <div className="text-center w-full lg:w-1/2  lg:text-left">
                <h1 className="text-4xl md:text-5xl text-center font-bold text-blue-600">Login now!</h1>
                 <img src={authImg} className="py-4 md:py-6  px-6 md:px-0" />
            </div>
            <div className="card bg-base-100 w-full lg:w-1/2 max-w-sm shadow-2xl">
                <form onSubmit={handleLogin} className="card-body rounded-lg"
                      style={{
                    backgroundImage: `url(${bgImage})`
                }}>
                    <fieldset className="fieldset">

                        <label className="label">Email</label>
                        <input type="email" name="email" className="input w-full" placeholder="Email" required />

                        <label className="label">Password</label>
                        <div className="relative mb-2">
                        <input type={showPassword ? "text" : "password"} name="password" className="input w-full" placeholder="Password" required />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute inset-y-0 right-2 flex items-center z-10 text-gray-500 hover:text-black text-sm"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <label className="label "> <LoadCanvasTemplate /> </label>
                        <input onBlur={handleValidateCaptcha} type="text"  name="captcha" className="input mb-1 w-full" placeholder="Type the text above" required />
                        {/* <button  className='btn btn-outline btn-xs w-1/4 hover:bg-black hover:text-white mt-2'>Validate</button> */}

                        <div><a onClick={handleForgotPassword} className="link link-hover hover:text-blue-700">Forgot password?</a></div>
                        
                        <input  disabled={disabled}  className="btn btn-primary mt-2" type="submit" value="Login" />
                    </fieldset>

                    <p className='text-center text-[#D1A054] font-semibold pt-1'>New here? <Link to="/signup" className='hover:font-bold hover:underline'>Create a New Account.</Link> </p>
                    
                    <div className="divider">OR</div>
                    {/* Google */}
                    <SocialLogin></SocialLogin>


                </form>

            </div>
        </div>
    </div>
    );
};

export default Login;
import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProviders';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Login = () => {

    const {signIn} = useContext(AuthContext);
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

    return (
    <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
            <div className="text-center w-full md:w-1/2  lg:text-left">
                <h1 className="text-5xl font-bold">Login now!</h1>
                <p className="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                    quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
            </div>
            <div className="card bg-base-100 w-full md:w-1/2 max-w-sm  shadow-2xl">
                <form onSubmit={handleLogin} className="card-body">
                    <fieldset className="fieldset">

                    <label className="label">Email</label>
                    <input type="email" name="email" className="input" placeholder="Email" required />

                    <label className="label">Password</label>
                    <input type="password" name="password" className="input my-1" placeholder="Password" required />

                    <label className="label"> <LoadCanvasTemplate /> </label>
                    <input onBlur={handleValidateCaptcha} type="text"  name="captcha" className="input mb-1" placeholder="Type the text above" required />
                    {/* <button  className='btn btn-outline btn-xs w-1/4 hover:bg-black hover:text-white mt-2'>Validate</button> */}

                    <div><a className="link link-hover hover:text-blue-700">Forgot password?</a></div>
                    
                    <input  disabled={disabled}  className="btn btn-primary mt-4" type="submit" value="Login" />
                    </fieldset>

                    <p className='text-center text-[#D1A054] font-semibold'><small>New here? <Link to="/signup" className='hover:font-bold hover:underline'>Create a New Account.</Link> </small></p>
                </form>

            </div>
        </div>
    </div>
    );
};

export default Login;
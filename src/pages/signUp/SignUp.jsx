import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";

const SignUp = () => {

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
                console.log('user profile info updated');
                
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully.",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');

            })
            .catch(error => console.log(error))
        })
    }


    return (
    <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center w-full md:w-1/2  lg:text-left">
                <h1 className="text-5xl font-bold">SignUp now!</h1>
                <p className="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                    quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
            </div>
            <div className="card bg-base-100 w-full md:w-1/2 max-w-sm  shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <fieldset className="fieldset">

                        <label className="label">Name</label>
                        <input type="text" {...register("name", { required: true })} name="name" className="input" placeholder="Name"  />
                        {errors.name && <span className="text-red-500">Name is required.</span>}
                       
                        <label className="label">Photo URL</label>
                        <input type="text" {...register("photoURL", { required: true })} name="photoURL" className="input" placeholder="Photo URL"  />
                        {errors.photoURL && <span className="text-red-500">Photo URL is required.</span>}

                        <label className="label">Email</label>
                        <input type="email" {...register("email", { required: true })} name="email" className="input" placeholder="Email" />
                        {errors.email && <span className="text-red-500">Email is required.</span>}

                        <label className="label">Password</label>
                        <input type="password"  {...register("password", { required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/ , minLength: 6 })} name="password" className="input" placeholder="Password" />
                        {errors.password?.type === 'required' && <span className="text-red-500">Password is required.</span>}
                        {errors.password?.type === 'minLength' && <span className="text-red-500">Password must be 6 characters.</span>}
                        {errors.password?.type === 'pattern' && <span className="text-red-500">Password must include uppercase, lowercase, number & special character.</span>}

                        <input  className="btn btn-primary mt-4" type="submit" value="Sign Up" />
                    </fieldset>

                    <p className="text-center text-[#D1A054] font-semibold"><small>Already registered? <Link to="/login" className="hover:font-bold hover:underline">Go to login.</Link> </small></p>
                </form>
                
            </div>
        </div>
    </div>
    );
};

export default SignUp;


//use fromik for those form
//react component e form ache like react hook form
import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ImSpoonKnife } from "react-icons/im";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const image_hosting_key = import.meta.env.VITE_Image_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItems = () => {
    const {name, recipe, category, price, _id} = useLoaderData();
    const { register, handleSubmit, reset} = useForm({
        defaultValues: {
            name,
            recipe,
            category,
            price
        }
    });

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        // console.log(data)
        //image upload to imgbb and then get photoURL
        const imageFile = { image: data.image[0]} 
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        if(res.data.success){
            //now send the menu item data to server with image
            const menuItem = {
                name: data.name,
                recipe: data.recipe,
                image: res.data.data.display_url,
                category: data.category,
                price: parseFloat(data.price)
            }
            
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            console.log(menuRes.data);
            if(menuRes.data.modifiedCount > 0){
                //show success
                reset();
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: `${data.name} is updated to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log(res.data);
    }

    return (
        <div>
            <SectionTitle
                subHeading={"Refresh Info!"}
                heading={"Update an Items"}
                >
            </SectionTitle>

            <div className="bg-base-300 p-6 md:p-12 lg:p-16 rounded-md shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:space-y-6">
                    {/* name */}
                    <div>
                        <label className="font-semibold block mb-2">Recipe Name*</label>

                        <input
                            type="text"   
                            placeholder="Recipe Name"
                            {...register('name', {required: true})}
                            className="w-full input input-bordered bg-white"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Category */}
                       <div>
                        <label className="font-semibold block mb-2">Category*</label>

                            <select  {...register('category', {required: true})}
                                className="select">

                                <option disabled={true} value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                                <option value="popular">Popular</option>
                                <option value="offered">Offered</option>
                            </select>
                       </div>


                        {/* price */}
                        <div>
                            <label className="font-semibold block mb-2">Price*</label>

                            <input
                            type="number"
                            placeholder="Price"
                            {...register('price', {required: true})}
                            className="w-full input input-bordered bg-white"
                            required
                            />
                        </div>
                    </div>

                    {/* Recipe Details */}
                    <div>
                    <label className="font-semibold block mb-2">Recipe Details*</label>

                    <textarea
                        rows="8"
                        {...register('recipe', {required: true})}
                        placeholder="Recipe Details"
                        className="w-full textarea textarea-bordered bg-white"
                        required
                    ></textarea>
                    </div>

                    {/* file upload */}
                    <div>
                        <input {...register('image', {required: true})} 
                        type="file" className="file-input file-input-ghost" />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="btn bg-[#D1A054] hover:bg-[#b8873f] text-white border-0 px-4 md:px-8 py-1 items-center"
                            >
                            Update Recipe Details <ImSpoonKnife />
                        </button>
                    </div>
                </form>

            </div>        
        </div>
    );
};

export default UpdateItems;


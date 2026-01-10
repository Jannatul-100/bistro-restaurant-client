

const FoodCard = ({item}) => {

    const {image, price, recipe, name} = item; 

    return (

            <div className="card bg-base-100 shadow-lg">
                <figure>
                    <img src={image} alt="salad" className="h-56 w-full object-cover" />
                </figure>
                <p className=" absolute right-0 mr-4 mt-4 px-4 py-2 text-sm text-white bg-slate-900 font-semibold">${price}</p>
                <div className="card-body text-center bg-base-300">
                    <h2 className="font-bold text-lg">{name}</h2>
                    <p className="text-sm text-gray-600">{recipe}</p>
                    <button className="btn btn-outline border-0 border-b-4 mx-auto bg-gray-300 text-yellow-600 hover:bg-gray-800  hover:text-yellow-600 hover:border-b-0  mt-3">ADD TO CART</button>

                </div>
            </div>
    

    );
};

export default FoodCard;
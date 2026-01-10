// import slide5 from '../assets/home/slide5.jpg';
import FoodCard from '../components/FoodCard';
import SectionTitle from '../components/SectionTitle';
import useMenu from '../hooks/useMenu';

const ChefCards = () => {
    
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    return (
        <div className="w-full my-24">

        {/* Top Black Banner */}
        <div className="bg-black text-white text-center py-20 text-4xl font-semibold">
            Call Us: +88 0192345678910
        </div>

        {/* Title */}
        <SectionTitle
            subHeading={"Should Try"}
            heading={"CHEF RECOMMENDS"}
            >
        </SectionTitle>

        {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-20">

            {
                     popular.map(item => 
                        <FoodCard key={item._id} item={item}></FoodCard>
                    )
             }

            </div>

        </div>

    );
};

export default ChefCards;




        //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-20">

        //     {/* Card 1 */}
        //     <div className="card bg-base-100 shadow-lg">
        //     <figure>
        //         <img src={slide5} alt="salad" className="h-56 w-full object-cover" />
        //     </figure>
        //     <div className="card-body text-center bg-base-300">
        //         <h2 className="font-bold text-lg">Caeser Salad</h2>
        //         <p className="text-sm text-gray-600">Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
        //         <button className="btn btn-outline border-0 border-b-4 mx-auto bg-gray-300 text-yellow-600 hover:bg-yellow-600 hover:text-white hover:border-b-0  mt-3">ADD TO CART</button>
        //         {/* <button className="btn bg-yellow-500 hover:bg-yellow-600 text-white mt-3">ADD TO CART</button> */}
        //     </div>
        //     </div>

        //     {/* Card 2 */}
        //     <div className="card bg-base-100 shadow-lg">
        //     <figure>
        //         <img src={slide5} alt="salad" className="h-56 w-full object-cover" />
        //     </figure>
        //     <div className="card-body text-center bg-base-300">
        //         <h2 className="font-bold text-lg">Caeser Salad</h2>
        //         <p className="text-sm text-gray-600">Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
        //         <button className="btn mx-auto bg-gray-800  text-yellow-600 mt-3">ADD TO CART</button>
        //     </div>
        // </div>

        //     {/* Card 3 */}
        //     <div className="card bg-base-100 shadow-lg">
        //     <figure>
        //         <img src={slide5} alt="salad" className="h-56 w-full object-cover" />
        //     </figure>
        //     <div className="card-body text-center bg-base-300">
        //         <h2 className="font-bold text-lg">Caeser Salad</h2>
        //         <p className="text-sm text-gray-600">Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
        //         <button className="btn btn-outline border-0 border-b-4 mx-auto bg-gray-300 text-yellow-600 hover:bg-yellow-600 hover:text-white hover:border-b-0  mt-3">ADD TO CART</button>
        //     </div>
        //     </div>

        // </div>
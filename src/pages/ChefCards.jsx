// import slide5 from '../assets/home/slide5.jpg';
import { Link } from 'react-router-dom';
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
            <Link to="/order/salad"><button className='btn btn-outline border-0 border-b-4 mt-8 mx-auto block uppercase' >View All Items</button></Link>

        </div>

    );
};

export default ChefCards;




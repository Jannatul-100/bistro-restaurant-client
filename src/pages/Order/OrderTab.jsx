import FoodCard from "../../components/FoodCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import './OrderTab.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "swiper/css/navigation";


const OrderTab = ({items}) => {

    //  Split items into chunks of 6
    const itemSize = 6;

      // Only one page → NO swiper
    if (items.length <= itemSize) {
        return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-20 mt-12">
            {items.map((item) => (
            <FoodCard key={item._id} item={item} />
            ))}
        </div>
        );
    }


    const slides = [];
    for (let i = 0; i < items.length; i += itemSize) {
        slides.push(items.slice(i, i + itemSize));
    }


    return (

        <div>
            <Swiper
                    pagination={{ type: "fraction", el: ".custom-pagination" }}
                    navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
            
            {slides.map((group, idx) => (
            <SwiperSlide key={idx}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-20 mt-12">
                    {
                        group.map(item => <FoodCard key={item._id} item={item} ></FoodCard>)
                    }
                </div>              
            </SwiperSlide>
             ))}

        </Swiper>

        {/* CUSTOM CONTROLS */}
        <div className="flex justify-center items-center gap-4 mt-6">
            <button className="custom-prev nav-circle">←</button>
            <div className="custom-pagination text-lg font-medium"></div>
            <button className="custom-next nav-circle">→</button>
        </div>
        </div>

    );
};

export default OrderTab;
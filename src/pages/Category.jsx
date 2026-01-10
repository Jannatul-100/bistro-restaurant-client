import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper/modules';
import slide1 from '../assets/home/slide1.jpg';
import slide2 from '../assets/home/slide2.jpg';
import slide3 from '../assets/home/slide3.jpg';
import slide4 from '../assets/home/slide4.jpg';
import slide5 from '../assets/home/slide5.jpg';
import chefService from '../assets/home/chef-service.jpg';
import SectionTitle from '../components/SectionTitle';



const Category = () => {
    return (
        <section>
            <SectionTitle
            subHeading={"From 11.00am to 10.00pm"}
            heading={"Order Online"}
            >
            </SectionTitle>

            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-24"
            >
                <SwiperSlide> 
                    <img src={slide1} alt=''/> 
                    <h3 className='text-lg  text-center uppercase text-white -m-12'>Salad</h3>
                </SwiperSlide>
                <SwiperSlide> 
                    <img src={slide2} alt=''/>
                    <h3 className='text-lg  text-center uppercase text-white -m-12'>Pizza</h3> 
                </SwiperSlide>
                <SwiperSlide> 
                    <img src={slide3} alt=''/> 
                    <h3 className='text-lg  text-center uppercase text-white -m-12'>Soup</h3>
                </SwiperSlide>
                <SwiperSlide> 
                    <img src={slide4} alt=''/> 
                    <h3 className='text-lg  text-center uppercase text-white -m-12'>Desserts</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide5} alt=''/>
                    {/* <h3 className='text-lg  text-center uppercase text-white -m-12'>Salad</h3>  */}
                </SwiperSlide>

            </Swiper>

                <div 
                    className="w-full bg-fixed h-[500px] bg-cover bg-center flex justify-center items-center mb-12"
                    style={{
                        backgroundImage:`url(${chefService})`

                    }}
                    >
                    <div className="bg-white shadow-xl p-12 md:p-16 max-w-sm md:max-w-2xl lg:max-w-4xl text-center">
                        <h2 className="text-3xl font-serif mb-4 tracking-wider">
                        Bistro Boss
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Necessitatibus, libero accusamus laborum deserunt ratione 
                        dolor officiis praesentium! Deserunt magni aperiam dolor 
                        eius dolore at, nihil iusto ducimus incidunt quibusdam nemo.
                        </p>
                    </div>
                </div>
        </section>
    );
};

export default Category;
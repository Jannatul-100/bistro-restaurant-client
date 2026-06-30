
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import SectionTitle from '../components/SectionTitle';
// import required modules
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';


const Testimonials = () => {

    const [reviews, setReviews] = useState([]);
   
    useEffect(() =>{
        fetch('http://localhost:5000/reviews')
        .then(res => res.json())
        .then(data => setReviews(data))
    }, [])

    return (
        <div className='mb-24'>
            <SectionTitle
                subHeading={"What Our Clients Say"}
                heading={"TESTIMONIALS"}
                >
            </SectionTitle>

            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
              
                    {
                        reviews.map(review => <SwiperSlide
                        key={review._id}>
                            <div className='mx-18 md:mx-32 flex flex-col items-center mt-8'>

                                <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                                />

                                <p className='mb-2 mt-4'>{review.details}</p>
                                <h3 className='text-xl text-orange-400 uppercase'>{review.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }

            </Swiper>

            </div>
            
        </div>
    );
};

export default Testimonials;
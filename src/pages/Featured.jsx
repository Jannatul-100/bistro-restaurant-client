import { Link } from 'react-router-dom';
import featuredImg from '../assets/home/featured.jpg';
import SectionTitle from '../components/SectionTitle';

const Featured = () => {

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
    });

    return (
        <div
        className=' relative text-white  bg-fixed bg-cover bg-center pt-2 md:pt-6 pb-12 md:pb-20 lg:pb-24 mb-24'       
        style={{
        backgroundImage:
          `url(${featuredImg})`
        }}>

            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            <div className="relative z-10">
                    {/* Title */}
                <SectionTitle
                    subHeading={"Check It Out"}
                    heading={"FROM OUR MENU"}
                    >
                </SectionTitle>

                <div className='flex flex-col md:flex-row justify-between items-center px-8 md:px-18 lg:px-50 gap-8 lg:gap-10'>
                    <div>
                        <img src={featuredImg}></img>
                    </div>
                    <div>
                        <h2>{formattedDate}</h2>
                        <h2>WHERE CAN I GET SOME?</h2>
                        <p>Explore our menu featuring delicious starters, handcrafted mains, fresh salads, gourmet burgers, and irresistible desserts. Every dish is prepared with care to ensure a memorable dining experience.</p>
                        <Link to="/menu"><button className='btn btn-outline border-0 border-b-4 mt-2'>Learn More</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
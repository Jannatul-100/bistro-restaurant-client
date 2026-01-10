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
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                        <button className='btn btn-outline border-0 border-b-4 mt-2'>Read More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;
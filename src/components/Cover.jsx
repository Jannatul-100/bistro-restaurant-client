import { Parallax } from 'react-parallax';

const Cover = ({img, title, para}) => {
    return (
        <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={img}
        bgImageAlt="menu"
        strength={-100}
    >
        <div className="hero h-[500px] lg:h-[600px]">
            {/* <div className="hero-overlay"></div> */}
            <div className="hero-content text-neutral-content text-center bg-black/50 shadow-xl py-8 px-2 md:py-16 md:px-16 lg:px-40">
                <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                <p className=" text-md">
                    {para}
                </p>

                </div>
            </div>
        </div>
    </Parallax>
        
    );
};

export default Cover;
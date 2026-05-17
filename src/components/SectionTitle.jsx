import React from 'react';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className='text-center md:w-4/12 mx-auto my-12'>
            <p className='text-yellow-600 py-2'>---{subHeading}---</p>
            <p className='uppercase text-2xl md:text-3xl lg:text-4xl border-y-3 border-base-300 py-4'>{heading}</p>
        </div>
    );
};

export default SectionTitle;
// import React, { useEffect, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import MenuItem from '../components/MenuItem';
import useMenu from '../hooks/useMenu';
import { Link } from 'react-router-dom';

const PopularMenu = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular');

    // useEffect( ()=>{
    //     fetch('menu.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         const popularItems = data.filter(item => item.category === 'popular');
    //         setMenu(popularItems)
    //     })
    // },[])

    return (
        <div className='mb-24'>
            <SectionTitle
                subHeading={"Check It Out"}
                heading={"FROM OUR MENU"}
                >
            </SectionTitle>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8 lg:px-0'>
                {
                    popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>

            <Link to="/menu"><button className='btn btn-outline border-0 border-b-4 mt-8 mx-auto block uppercase' >View Full Menu</button></Link>
        </div>
    );
};

export default PopularMenu;
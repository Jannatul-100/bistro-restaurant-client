import React from 'react';
import MenuItem from '../../components/MenuItem';
import { Link } from 'react-router-dom';

const MenuCategory = ({items}) => {
    const category = items[0]?.category || "salad";

    return (
        <div className='mb-16'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-16'>
                {
                    items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <Link to={`/order/${category}`}><button className='btn btn-outline border-0 border-b-4 mt-8 mx-auto block'>ORDER YOUR FAVOURITE FOOD</button></Link>
        </div>
    );
};

export default MenuCategory;
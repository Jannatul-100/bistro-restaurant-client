import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import shopCoverImg from '../../assets/shop/banner2.jpg';
import Cover from '../../components/Cover';
import { useState } from 'react';
import useMenu from '../../hooks/useMenu';
import FoodCard from '../../components/FoodCard';
import OrderTab from './OrderTab';
import { useParams } from 'react-router-dom';

const OrderShop = () => {
    
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks'];
    const {category} = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex === -1 ? 0 : initialIndex);
    const [menu] = useMenu();

    const drinks = menu.filter(item => item.category === 'drinks');
    const dessert = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
   
    return (
        <div>
            <Cover 
                img={shopCoverImg}
                title={"Our Shop"}
                para={"Would you like to try a dish?"}> 
            </Cover>

            <div className='my-16'>
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>Salad</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Soup</Tab>
                        <Tab>Desserts</Tab>
                        <Tab>Drinks</Tab>
                    </TabList>

                    {/* salad */}
                    <TabPanel>
                        <OrderTab items={salad}></OrderTab>
                    </TabPanel>

                    {/* pizza */}
                    <TabPanel>
                        <OrderTab items={pizza}></OrderTab>
                    </TabPanel>

                    {/* soup */}
                    <TabPanel>
                        <OrderTab items={soup}></OrderTab>
                    </TabPanel>

                    {/* dessert */}
                    <TabPanel>
                        <OrderTab items={dessert}></OrderTab>
                    </TabPanel>

                    {/* drinks */}
                    <TabPanel>
                        <OrderTab items={drinks}></OrderTab>
                    </TabPanel>
        
                </Tabs>
            </div>

        </div>
    );
};

export default OrderShop;
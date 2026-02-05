// import { Helmet } from 'react-helmet-async';
import Cover from '../../components/Cover';
import menuImg from '../../assets/menu/banner3.jpg';
import dessertImg from '../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../assets/menu/pizza-bg.jpg';
import saladImg from '../../assets/menu/salad-bg.jpg';
import soupImg from '../../assets/menu/soup-bg.jpg';
import PopularMenu from '../PopularMenu';
import useMenu from '../../hooks/useMenu';
import SectionTitle from '../../components/SectionTitle';
import MenuCategory from './MenuCategory';


const Menu = () => {


    const [menu] = useMenu();
    const offered = menu.filter(item => item.category === 'offered');
    const dessert = menu.filter(item => item.category === 'dessert');
    const pizza = menu.filter(item => item.category === 'pizza');
    const salad = menu.filter(item => item.category === 'salad');
    const soup = menu.filter(item => item.category === 'soup');
    const drinks = menu.filter(item => item.category === 'drinks');

    return (
        <div>
            {/* <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet> */}

            {/* Our Menu offered */}
            <Cover 
            img={menuImg}
            title={"Our Menu"}
            para={"Would you like to try a dish?"}> 
            </Cover>
            <SectionTitle
            subHeading={"Don't Miss"}
            heading={"Today's Offer"}
            ></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>

            {/* DESSERTS */}
            <Cover 
            img={dessertImg}
            title={"DESSERTS"}
            para={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}> 
            </Cover>
            <MenuCategory items={dessert}></MenuCategory>

            {/* PIZZA */}
            <Cover 
            img={pizzaImg}
            title={"PIZZA"}
            para={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}> 
            </Cover>
            <MenuCategory items={pizza}></MenuCategory>

            {/* SALADS */}
            <Cover 
            img={saladImg}
            title={"SALADS"}
            para={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}> 
            </Cover>
            <MenuCategory items={salad}></MenuCategory>

            {/* SOUPS */}
            <Cover 
            img={soupImg}
            title={"SOUPS"}
            para={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}> 
            </Cover>
            <MenuCategory items={soup}></MenuCategory>    
            
            {/* drinks */}
            <Cover 
            img={menuImg}
            title={"DRINKS"}
            para={"Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}> 
            </Cover>
            <MenuCategory items={drinks}></MenuCategory>
        </div>
    );
};

export default Menu;

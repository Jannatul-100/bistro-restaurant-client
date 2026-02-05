import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/shared/Footer';
import Navbar from '../pages/shared/Navbar';
import { useMatches } from "react-router-dom";
import { useEffect } from "react";


const Main = () => {

    const matches = useMatches();

    useEffect(() => {
        const title = matches
        .slice()
        .reverse()
        .find(match => match.handle?.title)?.handle.title;

        if (title) document.title = title;
    }, [matches]);

    
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');
    
    return (
        <div>
            {
               noHeaderFooter || <Navbar></Navbar>
            }
            <Outlet></Outlet>
            {
              noHeaderFooter || <Footer></Footer>
            }
        </div>
    );
};

export default Main;
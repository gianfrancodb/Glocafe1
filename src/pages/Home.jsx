import React from 'react';
import Navigation from '../components/Navigation/Navigation.jsx';
import HomeHero from '../components/Home/HomeHero';
import HomeArticles from '../components/Home/HomeArticles';
import Footer from '../components/Footer/Footer.jsx';
import CommoditiesPrices from '../components/Home/CoffeePrices.js';
import NewsFeed from '../components/Home/news.js';

const Home = () => {
    return (
        <>
            <Navigation page="work" />
            <HomeHero />
            <CommoditiesPrices />
            <NewsFeed/>
            <HomeArticles />
            <Footer />
        </>
    );
}

export default Home;
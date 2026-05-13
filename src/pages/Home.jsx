import React from 'react';
import Header from '../components/home/Header';
import HeroSection from '../components/home/HeroSection';
import Know from '../components/home/Know';
import Category from '../components/home/Category';
import Featured from '../components/home/Featured';
import Study from '../components/home/Study';
import Count from '../components/home/Count';
import Teacher from '../components/home/Teacher';
import SkillsBanner from '../components/home/SkillsBanner';

import Article from '../components/home/Article';
import Footer from '../components/home/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <Header />
      <HeroSection />
      <Know />
      <Category />
      <Featured />
      <Study />
      <Count />
      <Teacher />
      <SkillsBanner />

      <Article />
      <Footer />
    </div>
  );
};

export default Home;

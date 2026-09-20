import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import BlogList from '../components/BlogList';
import NewsLatter from '../components/NewsLatter';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className='bg-slate-50/20 min-h-screen font-sans antialiased'>
      <Navbar />
      <main className='space-y-16 sm:space-y-24 pb-12 transition-all duration-300'>
        <Header />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <BlogList />
        </div>
        <NewsLatter />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
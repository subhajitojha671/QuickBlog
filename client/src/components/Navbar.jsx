import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_2px_20px_rgba(0,0,0,0.01)]'
    >
      <div className='flex items-center justify-between h-16 sm:h-[72px] px-4 sm:px-16 max-w-7xl mx-auto'>
        <motion.img
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/')}
          src={assets.logo}
          alt='logo'
          className='w-28 sm:w-40 md:w-56 cursor-pointer object-contain shrink-0'
        />

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/admin')}
          className='group flex items-center gap-1.5 sm:gap-2 rounded-full sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider cursor-pointer bg-slate-950 hover:bg-slate-800 text-white px-3.5 sm:px-5 py-2.5 sm:py-3 shadow-md shadow-slate-950/20 shrink-0'
        >
          <span>{token ? "Dashboard" : "Login"}</span>
          <motion.img
            src={assets.arrow}
            alt='arrow'
            className='w-2 sm:w-2.5 brightness-200 object-contain'
            initial={{ x: 0 }}
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, repeatDelay: 2, duration: 0.8 }}
          />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Navbar;
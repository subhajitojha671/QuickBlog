import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = (e) => { e.preventDefault(); setInput(inputRef.current.value); };
  const onClear = () => { setInput(''); inputRef.current.value = ''; };

  return (
    <div className='mx-4 sm:mx-16 xl:mx-32 relative pt-24 sm:pt-28 lg:pt-32 pb-12 max-w-5xl lg:mx-auto'>

      <motion.div
        variants={container}
        initial='hidden'
        animate='show'
        className='text-center max-w-3xl mx-auto'
      >
        <motion.div
          variants={item}
          className='inline-flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 mb-6 bg-purple-50 border border-purple-100 rounded-full text-[10px] sm:text-xs font-semibold text-purple-700 shadow-xs shadow-purple-100/30'
        >
          <motion.span
            className='flex h-2 w-2 rounded-full bg-purple-600 shrink-0'
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
          <p>Now Powered with Advanced AI Co-Writing</p>
          <img src={assets.star_icon} alt='AI feature' className='w-3 object-contain shrink-0' />
        </motion.div>

        <motion.h1
          variants={item}
          className='text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-tight'
        >
          Where intellectual ideas meet{' '}
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500'>modern copy</span>.
        </motion.h1>

        <motion.p variants={item} className='mb-8 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-lg text-gray-500 leading-relaxed text-balance'>
          This is your space to think out loud, to share what matters, and to write without filters. Whether it's one word or a thousand, your story starts here.
        </motion.p>

        <motion.form
          variants={item}
          onSubmit={onSubmitHandler}
          className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 max-w-xl mx-auto sm:border sm:border-slate-200 bg-transparent sm:bg-white rounded-2xl sm:p-1.5 sm:shadow-[0_10px_30px_rgba(0,0,0,0.03)] focus-within:sm:ring-4 focus-within:sm:ring-primary/10 focus-within:sm:border-primary/80 transition-all duration-300'
        >
          <input
            ref={inputRef}
            type='text'
            placeholder='Search across categories or titles...'
            required
            className='w-full min-w-0 flex-1 border border-slate-200 sm:border-none rounded-xl sm:rounded-none bg-white sm:bg-transparent pl-4 py-3 sm:py-0 outline-none text-sm font-medium text-slate-800 placeholder-slate-400'
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type='submit'
            className='w-full sm:w-auto shrink-0 bg-primary text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 sm:py-3 rounded-xl shadow-sm'
          >
            Query
          </motion.button>
        </motion.form>
      </motion.div>

      <div className='text-center h-8 mt-5'>
        {input && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onClear}
            className='inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-full max-w-full'
          >
            <span className='truncate'>Clear Search Filter: "{input}"</span>
            <span className='font-normal text-slate-400 text-[10px] shrink-0'>✕</span>
          </motion.button>
        )}
      </div>

      <motion.div
        className='absolute -top-40 left-1/2 -translate-x-1/2 -z-10 w-full max-w-[800px] aspect-square bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-primary/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none'
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default Header;